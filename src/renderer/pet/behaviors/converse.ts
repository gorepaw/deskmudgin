// =============================================================================
// Two of them, talking — in Chinese, from the verified exchanges.
//
// The hard constraint is the one the whole brain is built on: a behaviour
// drives exactly one creature. A conversation looks like it needs two driven
// together, and the tempting shortcut is for the one who starts it to tell the
// other what to say. That is precisely the "reaches over and moves someone
// else" the brain forbids.
//
// So nobody is told anything. The speaker publishes what it just said, about
// itself, on `pet.utterance`. Every other creature can read that — it is the
// same kind of looking as giving way to a neighbour — and a listener's own
// `converse` scores very high when it notices it has been spoken to and the
// next turn is its own. Each side decides for itself to keep going. If the
// listener is asleep, or busy, or was thrown across the room, the speaker waits
// a little, gives up, and nothing is left in a half-state.
// =============================================================================

import type { Behavior, BehaviorCtx } from '../brain'
import type { Pet } from '../pet'
import { clamp } from '../../engine/math'
import { slow } from '../../../shared/clock'
import { turnsOf, type Entry } from '../../../shared/lang/types'
import { talkSeconds } from '../../ui/speech'
import { canConverse, pickExchange } from '../lines'

/** How near another creature has to be to talk to, in DIP. Close enough to
 *  read as the two of them together, rather than shouting across a monitor. */
const TALK_RANGE = 240
/** A reply is taken up to this long after the line it answers stopped
 *  showing. Longer, and a reply arrives to a conversation that has visibly
 *  ended; shorter, and a listener whose brain is mid-hop misses its cue. */
const REPLY_GRACE = 5
/** The next line goes up a little before the last one has gone, so the two
 *  bubbles overlap briefly and read as an exchange rather than two remarks. */
const OVERLAP = 0.85

/** Is `o` saying something to `me` that is still live? */
function addressing(o: Pet, me: Pet, now: number): boolean {
  const u = o.utterance
  return !!u && u.toward === me && now < u.at + u.dwell + REPLY_GRACE
    && u.turn + 1 < turnsOf(u.exchange).length
}

export function createConverse(): Behavior {
  /** Brain-clock time before which this one will not start a conversation.
   *  Replying is never gated by it: being spoken to is not something to put
   *  off. */
  let nextTalk = -1
  let partner: Pet | null = null
  let exchange: Entry | null = null
  let turns: Entry[] = []
  /** The next turn this creature will say. Speaker says 0, 2, 4…; listener 1, 3… */
  let mine = 0
  /** When waiting on the partner started, to give up on a partner who went quiet. */
  let waitingSince = 0

  function speak(ctx: BehaviorCtx): void {
    const line = turns[mine]
    // Timed by the same rule the bubble uses, so the partner waits exactly as
    // long as this line is actually on screen — player's setting included.
    const dwell = talkSeconds(line)
    ctx.say(line, dwell, true)
    ctx.pet.utterance = { exchange: exchange!, turn: mine, toward: partner!, at: ctx.now, dwell }
    mine += 2
    waitingSince = ctx.now
  }

  function face(ctx: BehaviorCtx, other: Pet): void {
    ctx.pet.pose.face = Math.sign(other.x - ctx.pet.x) || ctx.pet.pose.face
    ctx.pet.lookAt(other.x, other.y - 20)
  }

  const eligible = (ctx: BehaviorCtx): boolean => {
    const p = ctx.pet
    return !p.asleep && !p.held && p.grounded && p.surface.kind !== 'icon'
  }

  return {
    id: 'converse',
    layers: ['overlay', 'underlay'],
    minHold: 2,
    maxHold: 60,

    score(ctx) {
      if (!eligible(ctx)) return 0
      const near = ctx.near(ctx.pet.x, TALK_RANGE)
      // Answering outranks nearly everything: a creature that has been spoken
      // to and walks off reads as rude, or as a bug.
      if (near.some(o => addressing(o, ctx.pet, ctx.now))) return 0.9

      if (!canConverse()) return 0
      if (nextTalk < 0) nextTalk = ctx.now + slow(ctx.rng.range(20, 120))
      if (ctx.now < nextTalk) return 0
      // Someone awake, on the ground, and not already in a conversation.
      const free = near.some(o => !o.asleep && !o.held && o.grounded && !o.utterance)
      if (!free) return 0
      // Lonelier means chattier.
      return clamp(0.3 + (1 - ctx.pet.needs.needs.social) * 0.35)
    },

    enter(ctx) {
      const near = ctx.near(ctx.pet.x, TALK_RANGE)
      const caller = near.find(o => addressing(o, ctx.pet, ctx.now))
      if (caller) {
        // Joining one somebody else started: pick up at the turn after theirs.
        partner = caller
        exchange = caller.utterance!.exchange
        turns = turnsOf(exchange)
        mine = caller.utterance!.turn + 1
        waitingSince = ctx.now
        return
      }
      const free = near.filter(o => !o.asleep && !o.held && o.grounded && !o.utterance)
      // Nearest first: a conversation with the one beside you, not the one
      // two hundred pixels away with someone in between.
      free.sort((a, b) => Math.abs(a.x - ctx.pet.x) - Math.abs(b.x - ctx.pet.x))
      const hungry = ctx.pet.needs.needs.fullness < 0.4
      const tired = ctx.pet.needs.needs.energy < 0.35
      exchange = pickExchange(ctx.rng, hungry ? 'food' : tired ? 'sleep' : undefined)
      partner = free[0] ?? null
      turns = exchange ? turnsOf(exchange) : []
      mine = 0
      if (partner && exchange) speak(ctx)
    },

    tick(ctx) {
      if (!partner || !exchange || !eligible(ctx)) return 'done'
      // The partner can leave in every way a creature can: picked up, asleep,
      // wandered off, adopted into the other window. Any of them ends it.
      const other = partner
      if (other.held || other.asleep
        || !ctx.near(ctx.pet.x, TALK_RANGE * 1.3).includes(other)) return 'done'

      face(ctx, other)
      ctx.pet.pose.mouth = 0.14

      const said = other.utterance
      const theirLast = said && said.exchange.id === exchange.id && said.toward === ctx.pet
        ? said : null

      if (mine < turns.length) {
        // My turn comes once they have said the turn before it and it has
        // been up long enough to read.
        if (theirLast && theirLast.turn === mine - 1
          && ctx.now >= theirLast.at + theirLast.dwell * OVERLAP) {
          speak(ctx)
        } else if (ctx.now - waitingSince > 14) {
          return 'done' // they never answered; nothing to be done about it
        }
        return
      }

      // I have said my last line. Stay until it has been read, and until theirs
      // has, if they have one more to say.
      const mineUp = ctx.pet.utterance ? ctx.pet.utterance.at + ctx.pet.utterance.dwell : 0
      const theirsUp = theirLast ? theirLast.at + theirLast.dwell : 0
      const lastTurn = turns.length - 1
      const theyOweOne = lastTurn % 2 !== (mine - 2) % 2 && (!theirLast || theirLast.turn < lastTurn)
      if (theyOweOne && ctx.now - waitingSince < 14) return
      if (ctx.now < Math.max(mineUp, theirsUp)) return
      return 'done'
    },

    exit(ctx) {
      // Only clear what is ours. `utterance` is this creature's own announcement;
      // clearing it tells everyone the conversation is over on this side.
      ctx.pet.utterance = null
      partner = null
      exchange = null
      turns = []
      nextTalk = ctx.now + slow(ctx.rng.range(40, 180))
    },
  }
}
