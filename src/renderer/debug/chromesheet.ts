// =============================================================================
// Chrome sheet. With DESKMUDGIN_CONTACT=chrome and `?theme=<id>`, the real
// Settings and Dictionary panels and a spread of speech bubbles, in one theme,
// over a wallpaper that runs from dark to light.
//
// For judging a theme as a whole — a frame is only right if it holds up on the
// busiest panel, the longest list, and a bubble a sixth of the size, on any
// desktop. The panels are the real classes on a stub host, so what is judged
// here is what ships, not a mock of it.
//
// Meant for `npm run snap -- chrome out.png 2200 860 theme=<id> [l2=ar l1=es also=en tab=words border=brass|none|theme]`,
// which renders it offscreen.
// =============================================================================

import type { Painter } from '../engine/painter'
import type { MudginBridge } from '../../shared/ipc'
import { DEFAULT_SETTINGS, type Settings } from '../../shared/types'
import { applyTheme } from '../ui/theme'
import { setBorder } from '../ui/frames'
import type { Panel, PanelHost } from '../ui/panel'
import { SettingsPanel } from '../ui/menu'
import { DictionaryPanel } from '../ui/dictionary'
import { StarterPanel } from '../ui/starter'
import { MenuPanel } from '../ui/menu'
import { newPetSave } from '../../shared/types'
import { roll, sampler, hashSeed } from '../../shared/genome'
import { Speech } from '../ui/speech'
import { lessonLang, setTongue } from '../pet/lines'
import { LEVELS } from '../../shared/lang/levels'
import type { LanguageId, Utterance } from '../../shared/lang/types'
import type { Tab } from '../ui/dictionary'
import { setUpdateState } from '../ui/update'
import type { UpdateState } from '../../shared/ipc'

export class ChromeSheet {
  private readonly panels: Panel[]
  private readonly lines: Utterance[]

  constructor(
    private w: number, private h: number, theme: string,
    tongue: { l2: LanguageId; l1: LanguageId; l1Also: LanguageId | null; tab?: string; border?: string },
  ) {
    applyTheme(theme)
    const settings: Settings = { ...DEFAULT_SETTINGS, theme, level: 'hsk3', ...tongue }
    setTongue(settings)
    setBorder(settings.border)
    const starters = (['mudgin', 'sephin'] as const).map((sp, i) =>
      newPetSave(`starter-${i}`, sp, sp, roll(sp, sampler(hashSeed(`starter-${i}`))), 0, 0, 'overlay'))
    // Everything a panel may ask of its host, answered with nothing: an empty
    // colony, an empty ledger. The sheet shows the chrome, not anyone's data.
    const bridge = {
      invoke: async (channel: string) => channel === 'settings:get' ? settings
        : channel === 'starter:offer' ? starters : [],
      on: () => () => {},
    } as unknown as MudginBridge
    const host: PanelHost = {
      open: () => {}, close: () => {}, closeAll: () => {}, invalidate: () => {},
      bridge, settings: () => settings,
    }
    // Every Settings tab side by side, then the dictionary.
    const tabs = (['where', 'speech', 'look'] as const).map(t => new SettingsPanel(t))
    tabs.forEach((s, i) => { s.x = 20 + i * 340; s.y = 20 })
    const d = new DictionaryPanel((tongue.tab ?? 'phrases') as Tab)
    d.x = 20 + tabs.length * 340; d.y = 20
    // Below them: the Matron's menu and the first-run starter, the two panels
    // every new player meets first.
    // `update=available|downloading|ready|error|none|idle` draws the menu's
    // update slot in that state; without it, the slot is a dev run's.
    const up = new URLSearchParams(location.search).get('update')
    setUpdateState(up
      ? { status: up as UpdateState['status'], current: '0.1.0', version: '0.2.0', percent: 42 }
      : { status: 'disabled', current: '0.1.0' })
    const m = new MenuPanel()
    m.x = 20; m.y = 520
    const st = new StarterPanel()
    st.x = 280; st.y = 520
    for (const p of [...tabs, d, m, st]) { p.host = host; void p.mount?.() }
    this.panels = [...tabs, d, m, st]
    const l2 = lessonLang()
    const h1 = LEVELS[0].phrases.entries.filter(e => e.in[l2])
    const h2 = LEVELS[LEVELS.length - 1].phrases.entries.filter(e => e.in[l2])
    const pool = h2.length ? h2 : h1
    this.lines = ['hrrr!', h1[0], pool[27] ?? pool[0], pool.find(e => (e.in[l2]?.text.length ?? 0) > 13) ?? pool[1]]
      .filter(Boolean)
  }

  draw(g: Painter, now: number): void {
    // Wallpaper from night to daylight, so every bubble is seen on both.
    const bg = g.ctx.createLinearGradient(0, 0, this.w, 0)
    bg.addColorStop(0, '#1a2230')
    bg.addColorStop(0.55, '#4a5a6a')
    bg.addColorStop(1, '#dfe3e8')
    g.ctx.fillStyle = bg
    g.ctx.fillRect(0, 0, this.w, this.h)

    for (const p of this.panels) p.draw(g, now)

    const x0 = 20 + 3 * 340 + 500
    this.lines.forEach((u, i) => {
      for (const [j, dx] of [[0, 0], [1, 330]] as const) {
        const s = new Speech()
        s.say(u, 60)
        s.update(1)
        s.draw(g, x0 + 150 + dx, 120 + i * 120 + j * 0, this.w)
      }
    })
  }
}
