// The language registry. One place that knows what exists.

import type { Language, LanguageId } from './types'

export * from './types'

export const LANGUAGES: Record<LanguageId, Language> = {
  en: {
    id: 'en', label: 'English', hasReading: false, probe: 'A',
    font: '"IBM Plex Mono", Consolas, monospace',
  },
  zh: {
    id: 'zh', label: '中文 Chinese', hasReading: true, probe: '好',
    // Both ship with Windows and both are present on this machine; the app is
    // Windows-only by construction, so nothing is bundled. sans-serif last so a
    // stripped install degrades to something rather than to nothing.
    font: '"Microsoft YaHei", "Microsoft YaHei UI", SimSun, sans-serif',
  },
}

export const languageOf = (id: LanguageId): Language => LANGUAGES[id] ?? LANGUAGES.en
