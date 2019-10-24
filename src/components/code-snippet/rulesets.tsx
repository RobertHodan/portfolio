import { SectionRuleset } from "./code-snippet";

export const CodeSnippetTSX: SectionRuleset[] = [
  {
    words: ['export', 'import', 'from', 'for', 'if', 'else', 'return'],
    className: 'is-conditional',
  }, {
    words: ['function', 'let', 'const', 'this'],
    className: 'is-declaration',
  }, {
    symbol: ':',
    excludeSelf: true,
    includeNextWord: true,
    className: 'after-colon',
  }, {
    symbol: '.',
    excludeSelf: true,
    connectWords: true,
    includeNextWord: true,
    includePreviousWord: true,
    usePreviousWord: true,
  }, {
    symbol: '(',
    className: 'is-method',
    excludeSelf: true,
    includePreviousWord: true,
  }, {
    symbols: [`'`, `"`, '`'],
    className: 'is-string',
    includePreviousWord: true,
    connectWords: true,
  }
]

export const CodeSnippetSCSS: SectionRuleset[] = [
  {
    symbol: '.',
    includeNextWord: true,
    connectWords: true,
    className: 'is-class',
  }, {
    symbol: '-',
    connectWords: true,
    usePreviousWord: true,
    useNextWord: true,
    includeNextWord: true,
  }, {
    symbol: ':',
    excludeSelf: true,
    includePreviousWord: true,
    className: 'before-colon',
  }, {
    symbol: '#',
    className: 'is-word',
  }, {
    words: ['em', 'px', '%'],
    className: 'is-number',
    isPartial: true,
  }
]
