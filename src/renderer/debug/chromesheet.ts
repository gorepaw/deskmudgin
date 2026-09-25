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
// Meant for `npm run snap -- chrome out.png 1520 860 theme=<id>`, which renders
// it offscreen.
// =============================================================================

import type { Painter } from '../engine/painter'
import type { MudginBridge } from '../../shared/ipc'
import { DEFAULT_SETTINGS, type Settings } from '../../shared/types'
import { applyTheme } from '../ui/theme'
import type { Panel, PanelHost } from '../ui/panel'
import { SettingsPanel } from '../ui/menu'
import { DictionaryPanel } from '../ui/dictionary'
import { Speech } from '../ui/speech'
import { setLanguage } from '../pet/lines'
import { ZH_LEVELS } from '../../shared/lang/levels'
import type { Utterance } from '../../shared/lang/types'

export class ChromeSheet {
  private readonly panels: Panel[]
  private readonly lines: Utterance[]

  constructor(private w: number, private h: number, theme: string) {
    applyTheme(theme)
    setLanguage('zh')
    const settings: Settings = { ...DEFAULT_SETTINGS, theme, level: 'hsk2' }
    // Everything a panel may ask of its host, answered with nothing: an empty
    // colony, an empty ledger. The sheet shows the chrome, not anyone's data.
    const bridge = {
      invoke: async (channel: string) => (channel === 'settings:get' ? settings : []),
      on: () => () => {},
    } as unknown as MudginBridge
    const host: PanelHost = {
      open: () => {}, close: () => {}, closeAll: () => {}, invalidate: () => {},
      bridge, settings: () => settings,
    }
    const s = new SettingsPanel()
    const d = new DictionaryPanel('phrases')
    s.x = 20; s.y = 20
    d.x = 370; d.y = 20
    for (const p of [s, d]) { p.host = host; void p.mount() }
    this.panels = [s, d]
    const h2 = ZH_LEVELS[1].phrases.entries
    this.lines = ['hrrr!', ZH_LEVELS[0].phrases.entries[0], h2[27], h2.find(e => e.script.length > 13) ?? h2[1]]
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

    const x0 = 880
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
