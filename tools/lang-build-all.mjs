// =============================================================================
// Rebuild every course, in dependency order.
//
//   npm run lang:build-all
//
// A translation lands in the app only when its course is rebuilt, and there are
// seven courses per language to remember. This is the list, so nobody has to
// hold it in their head; each build still refuses on its own terms and stops
// the run.
// =============================================================================

import { execFileSync } from 'node:child_process'

/** [corpus, course id, kind] — wordlists before the courses validated against them. */
const COURSES = [
  ['content/zh/hsk1.words.tsv', 'zh-hsk1-words', 'words'],
  ['content/zh/hsk2.words.tsv', 'zh-hsk2-words', 'words'],
  ['content/zh/hsk3.words.tsv', 'zh-hsk3-words', 'words'],
  ['content/zh/hsk1.tsv', 'zh-hsk1', 'phrases'],
  ['content/zh/hsk2.tsv', 'zh-hsk2', 'phrases'],
  ['content/zh/hsk3.tsv', 'zh-hsk3', 'phrases'],
  ['content/zh/hsk1.exchanges.tsv', 'zh-hsk1-exchanges', 'exchanges'],
  ['content/zh/hsk2.exchanges.tsv', 'zh-hsk2-exchanges', 'exchanges'],
  ['content/zh/hsk3.exchanges.tsv', 'zh-hsk3-exchanges', 'exchanges'],
  ['content/zh/names.tsv', 'zh-names', 'names'],
]

for (const [path, course, kind] of COURSES) {
  const level = kind === 'names' ? ['--level', 'names'] : []
  execFileSync(process.execPath, ['tools/lang-build.mjs', path, '--course', course, '--kind', kind, ...level],
    { stdio: 'inherit' })
}
