// =============================================================================
// Everyone this window is responsible for.
//
// The colony is **roster-driven**: main owns the full collection (out and
// resting, both layers) and pushes each window its share. `sync` reconciles the
// live creatures against that list — keeping the ones still present, dropping
// the ones that left, and constructing the ones that arrived. Nothing here
// decides who belongs; it only reacts to being told.
//
// That is what lets a pet be moved between layers, set to rest, or adopted from
// the wild without any of those actions knowing what a window is. They change
// the roster in main; two windows reconcile.
//
// Neighbour lookup goes through a `Neighborhood` index, re-indexed once per
// tick and shared by everybody. Nothing is cached on a creature: a stored
// neighbour list is a stale-reference bug waiting for the first departure.
// =============================================================================

import type { PetSave } from '../../shared/types'
import type { Fx } from '../art/fx'
import type { Painter } from '../engine/painter'
import type { Box } from '../engine/stage'
import type { Sfx } from '../audio/sfx'
import type { World } from '../world/world'
import type { MatronRef } from '../ui/matron'
import type { Pet } from './pet'
import { Neighborhood } from './neighbors'
import { Creature } from './creature'

export class Colony {
  private members: Creature[] = []
  private uiScale = 1
  /**
   * The Matron, if she is standing in this window's layer.
   *
   * Held here rather than reached for by each behaviour, because whether she is
   * reachable is a property of the window — the same fact that decides whether
   * this colony can see desktop icons.
   */
  private matron: MatronRef | null = null

  constructor(
    private world: World,
    private fx: Fx,
    private sfx: Sfx,
    /** Called when anyone lands, so the loop can make a noise and a puff. */
    private onLand: (c: Creature) => void,
  ) {}

  get all(): readonly Creature[] { return this.members }
  get size(): number { return this.members.length }

  setScale(scale: number): void { this.uiScale = scale }
  setMatron(m: MatronRef | null): void { this.matron = m }

  /**
   * Reconcile against a roster from main.
   *
   * Returns true if the membership changed, so the caller knows to invalidate
   * the whole surface — a creature that left has to be erased from wherever it
   * was standing, and its dirty rect goes with it.
   */
  sync(roster: readonly PetSave[]): boolean {
    const wanted = new Map(roster.map(p => [p.id, p]))
    const before = this.members.length
    let changed = false

    // Keep whoever is still on the list, and let their layer/out flags follow.
    this.members = this.members.filter(c => {
      const save = wanted.get(c.id)
      if (!save) { changed = true; return false }
      c.layer = save.layer
      c.out = save.out
      // A visitor can be adopted, or told to leave, without ceasing to be the
      // same creature — so these follow the roster rather than being fixed at
      // construction. Adoption in particular must not rebuild it, or the pet
      // you just clicked would blink and lose its place mid-step.
      c.pet.wild = !!save.wild
      c.pet.leaving = !!save.leaving
      wanted.delete(c.id)
      return true
    })

    // Whatever is left on the list is new to this window.
    for (const save of wanted.values()) {
      this.members.push(new Creature(save, this.world, this.fx, this.sfx, this.uiScale))
      changed = true
    }

    return changed || this.members.length !== before
  }

  private readonly hood = new Neighborhood()
  /** One scratch array of bodies, refilled per tick and reused forever, so
   *  re-indexing costs no allocation at all. */
  private flat: Pet[] = []

  tick(dt: number, now: number): void {
    // Index once, then everybody thinks against the same snapshot.
    //
    // This used to be a list of everyone else assembled per creature per frame:
    // n² pushes 30 times a second, paid whether or not a single behaviour asked
    // a question about its neighbours. Since every rule that does ask is asking
    // about a place rather than about the colony, one O(n) index answers all of
    // them and the tick stops caring how many are out.
    //
    // The snapshot is taken before anyone moves, so nobody is compared against
    // a neighbour who has already had this frame and nobody against one who has
    // not — a first-mover advantage that would be invisible at eight pets and
    // very visible at two hundred.
    this.flat.length = 0
    for (const c of this.members) this.flat.push(c.pet)
    this.hood.rebuild(this.flat)

    for (const c of this.members) {
      c.tick(dt, now, this.world, this.hood, this.matron, () => this.onLand(c))
    }
  }

  draw(g: Painter): void {
    // Painted in roster order, so a newer arrival stands in front of an older
    // one. Sorting by y would be more correct and less legible — they all stand
    // on the same few ledges, so it would flicker whenever two crossed.
    for (const c of this.members) c.draw(g, this.world.width)
  }

  /** One dirty rect each, not one union of everybody. Two creatures on opposite
   *  monitors would union into the entire virtual desktop, which is exactly the
   *  repaint the stage exists to avoid. */
  bounds(): Box[] { return this.members.map(c => c.bounds()) }

  /**
   * Nearest creature the point actually lands on.
   *
   * Nearest rather than first, because they overlap: two standing close enough
   * for both hit boxes to cover the cursor should hand the click to the one you
   * were obviously aiming at, not to whichever is earlier in the list.
   */
  hit(x: number, y: number, pad?: number): Creature | null {
    let best: Creature | null = null
    let bestD = Infinity
    for (const c of this.members) {
      if (!c.pet.hit(x, y, pad)) continue
      const d = Math.hypot(c.pet.x - x, c.pet.y - y)
      if (d < bestD) { bestD = d; best = c }
    }
    return best
  }

  nearest(x: number): Creature | null {
    let best: Creature | null = null
    let bestD = Infinity
    for (const c of this.members) {
      const d = Math.abs(c.pet.x - x)
      if (d < bestD) { bestD = d; best = c }
    }
    return best
  }

  each(fn: (c: Creature) => void): void { for (const c of this.members) fn(c) }

  toSave(): PetSave[] { return this.members.map(c => c.toSave(this.world)) }
}
