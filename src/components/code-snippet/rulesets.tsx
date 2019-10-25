import { Rule } from "./code-snippet";

const chars = [' ', '-', '=', '.', '<', '>', '+', '{', '}', ':', '[', ']', '(', ')', '\n', ';', '!', '&'];
export const CodeSnippetTSX: Rule[] = [
  {
    symbols: chars,
    className: 'is-char',
  }, {
    words: ['export', 'if', 'else', 'for', 'return'],
    className: 'is-conditional',
  }, {
    words: ['function', 'class', 'extends', 'let', 'const', 'this'],
    className: 'is-declaration',
  } , {
    symbol: ':',
    affectNextSibling: true,
    siblingIsNotCharacter: true,
    className: 'is-type',
    searchUntilValid: true,
    searchNextOnly: true,
    classNameWhitelist: 'is-char',
  }, {
    symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    className: 'is-number',
    siblingWhitelist: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'em', 'px', '%'],
    searchUntilChar: chars,
  }, {
    symbol: '.',
    siblingIsConnected: true,
    matchSiblings: true,
    classNameWhitelist: 'is-char',
  }, {
    symbol: '(',
    affectPreviousSibling: true,
    siblingIsNotCharacter: true,
    siblingIsConnected: true,
    className: 'is-method',
    classNameWhitelist: 'is-char',
  }, {
    words: ['em', 'px', '%'],
    className: 'is-number',
  }, {
    symbols: [`'`, `"`],
    className: 'is-string',
    affectNextSibling: true,
    searchNextOnly: true,
    searchUntilChar: chars,
  },
  {
    symbol: '{',
    indentNextLine: 2,
  }, {
    symbol: '}',
    indentCurrentLine: -2,
  }
]

export const CodeSnippetSCSS: Rule[] = [
  {
    symbols: chars,
    className: 'is-char',
  }, {
    symbol: '.',
    className: 'is-class',
    affectNextSibling: true,
  }, {
    symbol: '-',
    className: 'hyphen',
    searchPreviousOnly: true,
    affectPreviousSibling: true,
    siblingIsConnected: true,
    matchSiblings: true,
  }, {
    symbol: ':',
    className: 'before-colon',
    classNameWhitelist: 'is-char',
    affectPreviousSibling: true,
  }, {
    symbols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','],
    className: 'is-number',
    siblingWhitelist: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'em', 'px', '%', ','],
    searchUntilChar: chars,
  }, {
    words: ['em', 'px', '%'],
    className: 'is-number',
  }, {
    symbol: '{',
    indentNextLine: 2,
  }, {
    symbol: '}',
    indentCurrentLine: -2,
  }, {
    symbol: '&',
    className: 'is-ampersand',
  }, {
    symbol: '(',
    affectPreviousSibling: true,
    siblingIsNotCharacter: true,
    siblingIsConnected: true,
    className: 'is-method',
    classNameWhitelist: 'is-char',
  }
]
