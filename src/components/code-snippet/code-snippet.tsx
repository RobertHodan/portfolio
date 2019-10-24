import React from 'react';
import './code-snippet.scss';
import { concatStringsUnique, getNextUniqueId } from '../../utils/utils';
import { CodeSnippetTSX, CodeSnippetSCSS } from './rulesets';

export type SectionRuleset = WordRuleset | SymbolRuleset;

type WordRuleset = {
  word: string,
  words?: string[],
  className: string,
  // If true, applies to any word that contains the string
  isPartial?: boolean,
};

type SymbolRuleset = {
  symbol?: string,
  symbols?: string[],
  className?: string,
  excludeSelf?: boolean,
  // Only include words connected by a non-whitespace symbol
  connectWords?: boolean,
  // Include next word, regardless of whitespace
  includeNextWord?: boolean,
  includePreviousWord?: boolean,
  usePreviousWord?: boolean,
}

type SectionMap = {
  [id: string]: WordData | SymbolData;
}

type WordData = {
  id: string,
} & WordCoreData;

type SymbolData = {
  id: string,
} & SymbolCoreData;

type SymbolCoreData = {
  symbol: string,
  className: string,
  excludeSelf?: boolean,
  // Only include words connected by a non-whitespace symbol
  connectWords?: boolean,
  // Include next word, regardless of whitespace
  includeNextWord?: boolean,
  includePreviousWord?: boolean,
  // Use the className of the previous word
  usePreviousWord?: boolean,
  useNextWord?: boolean,
}

type WordCoreData = {
  className: string,
  word: string,
  isPartial?: boolean,
}

type WordRulesetMap = {
  [word: string]: WordCoreData,
}

type SymbolRulesetMap = {
  [symbol: string]: SymbolCoreData,
}

export type CodeSnippetProps = {
  children: string,
  indentation: number,
  indentationIncreaseChar: string,
  indentationDecreaseChar: string,
  className: string,
  lang?: string,
};

export class CodeSnippet extends React.Component<CodeSnippetProps> {
  static defaultProps = {
    indentation: 2,
    indentationIncreaseChar: '{',
    indentationDecreaseChar: '}',
  }
  includePreviousWordOverride?: boolean;
  sectionMap: SectionMap = {};
  sectionOrder: string[] = [];
  prevSection?: SymbolData | WordData;

  render () {
    const { lang } = this.props;
    let ruleset: SectionRuleset[] = [];
    let className = this.props.className || 'code-snippet';
    if (!lang || lang === 'tsx') {
      ruleset = CodeSnippetTSX;
      className += ' tsx';
    } else if (lang === 'scss') {
      ruleset = CodeSnippetSCSS;
      className += ' scss';
    }
    this.updateSections(this.props.children, ruleset);

    return (
      <pre className={className}>
        {this.generateElements()}
      </pre>
    );
  }

  generateElements() {
    const elements: React.ReactNode[] = [];
    const ids = this.sectionOrder;
    let values = '';
    for (let i = 0; i < ids.length; i += 1) {
      const section = this.sectionMap[ids[i]];
      const nextSection = this.sectionMap[ids[i+1]];
      let value = this.getValue(section);

      if (nextSection && section.className === nextSection.className) {
        values += value;
        continue;
      }

      if (values.length) {
        value = values + value;
        values = '';
      }

      elements.push((
        <span className={section.className} key={section.id}>{value}</span>
      ))
    }

    return elements;
  }

  getValue(data: WordData | SymbolData) {
    return this.isWordRuleset(data)
      ? (data as WordData).word
      : (data as SymbolData).symbol;
  }

  updateSections(code: string, rulesets: SectionRuleset[]) {
    const [symbolRulesMap, symbolList] = this.getSymbolRules(rulesets);
    const [wordRulesMap, wordList] = this.getWordRules(rulesets);

    this.sectionMap = {};
    this.sectionOrder = [];
    let word = '';
    let wordIsNumber = true;
    let prevWordSection;
    let nextWordClassName = '';
    let stripSpaces = false;
    let previousIndentation;
    let indentation = 0;
    for (let i = 0; i < code.length; i += 1) {
      const char = code[i];
      const nextChar = code[i+1];
      const prevChar = code[i-1];

      if (char === this.props.indentationIncreaseChar) {
        indentation += this.props.indentation;
      } else if (char === this.props.indentationDecreaseChar && previousIndentation) {
        indentation -= this.props.indentation;
        (previousIndentation as WordData).word = ' '.repeat(indentation);
      }

      if (char !== ' ') {
        stripSpaces = false;
      }

      // Check for letters
      if (this.isLetterOrNumber(char) ||
        // Check if the period is used within a float
        (char === '.' && this.isNumber(prevChar) && this.isNumber(nextChar))
      ) {
        if (this.isLetter(char)) {
          wordIsNumber = false;
        }
        word += char;
        continue;
      }

      // Check if a word should be handled
      if (word.length) {

        const isNumber = wordIsNumber;
        const wordRules = {
          word: word,
          className: isNumber ? 'is-number' : 'is-word',
        }
        if (nextWordClassName) {
          wordRules.className = concatStringsUnique(wordRules.className, nextWordClassName);
          nextWordClassName = '';
        }
        if (wordList.includes(word)) {
          wordRules.className = concatStringsUnique(wordRules.className, wordRulesMap[word].className);
        }
        const newId = getNextUniqueId();
        this.addSection(newId, wordRules);

        prevWordSection = this.sectionMap[newId];
        word = '';
        wordIsNumber = true;
      }

      // Handle symbols
      if (symbolList.includes(char)) {
        const {className, ...rules} = symbolRulesMap[char];
        const newId = getNextUniqueId();
        let newClassName = className;
        if (rules.usePreviousWord) {
          newClassName = prevWordSection
            ? prevWordSection.className
            : '';
        }
        if (rules.useNextWord) {
          this.includePreviousWordOverride = true;
        }

        if (rules.includeNextWord) {
          if (!rules.connectWords || this.isLetter(nextChar)) {
            nextWordClassName = concatStringsUnique(nextWordClassName, newClassName);
          }
        }

        if (rules.includePreviousWord) {
          this.modifyPreviousSectionClassName(newClassName);
          if (!rules.connectWords || this.isLetter(prevChar)
          ) {
            // prevWordSection.className = concatStringsUnique(prevWordSection.className, newClassName);
          }
        }

        if (!rules.excludeSelf) {
          this.addSection(newId, {
            className: newClassName,
            ...rules,
          });
          continue;
        }
      }

      // Handle all other symbols
      if (!this.isLetter(char)) {
        // Strip spaces out at the start of each line
        // These will be programmatically added back in
        if (char === '\n') {
          nextWordClassName = '';
          stripSpaces = true;
        }
        if (stripSpaces && char === ' ') {
          continue;
        }

        const newId = getNextUniqueId();
        this.addSection(newId, {
          symbol: char,
          className: '',
        });

        // Handle indentation
        if (char === '\n') {
          const indentId = getNextUniqueId();
          this.addSection(indentId, {
            word: ' '.repeat(indentation),
            className: '',
          });
          previousIndentation = this.sectionMap[indentId];
        }
      }
    }
  }

  modifyPreviousSectionClassName(className: string) {
    if (this.prevSection) {
      this.modifySectionClassName(this.prevSection.id, className);
    }
  }

  // Can only work backwards
  modifySectionClassName(id: string, className: string) {
    let section = this.sectionMap[id];
    if (!section) {
      return;
    }
    if (this.isWordRuleset(section)) {
      section.className = concatStringsUnique(section.className, className);
      return;
    }
    section = section as SymbolData;

    if (!section.excludeSelf) {
      section.className = concatStringsUnique(section.className, className);
    }

    const prevSection = this.getPreviousSection(section.id);
    if (section.includePreviousWord && prevSection) {
      this.modifySectionClassName(prevSection.id, className);
    }
  }

  getPreviousSection(id: string): SymbolData | WordData | undefined {
    const index = this.sectionOrder.indexOf(id);
    return this.sectionMap[this.sectionOrder[index-1]];
  }

  addSection(id: string, data: WordCoreData | SymbolCoreData) {
    this.sectionMap[id] = {
      id: id,
      ...data,
    };
    let section = this.sectionMap[id];
    this.prevSection = this.sectionMap[id];

    if (this.includePreviousWordOverride !== undefined) {
      section = section as SymbolData;
      section.includePreviousWord = this.includePreviousWordOverride;
      this.includePreviousWordOverride = undefined;
    }

    this.sectionOrder.push(id);
  }

  isLetterOrNumber(char: string): boolean {
    return this.isLetter(char) || this.isNumber(char);
  }

  isNumber(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  isLetter(char: string): boolean {
    const lower = char.toLowerCase();
    return lower >= 'a' && lower <= 'z';
  }

  getWordRules(rulesets: SectionRuleset[]): [WordRulesetMap, string[]] {
    const rulesetWords: string[] = [];
    const rulesetMap: WordRulesetMap = {};

    rulesets.forEach((ruleset) => {
      if (!this.isWordRuleset(ruleset)) {
        return;
      }

      const wordRuleset = ruleset as WordRuleset;
      const words = wordRuleset.words || [wordRuleset.word];
      for (const word of words) {
        const wordData = rulesetMap[word];
        let classNames = wordData
          ? concatStringsUnique(rulesetMap[word].className, wordRuleset.className)
          : wordRuleset.className;

        rulesetMap[word] = {
          className: classNames,
          word: word,
          // isPartial: wordData.isPartial,
        };
        if (!rulesetWords.includes(word)) {
          rulesetWords.push(word);
        }
      }
    });

    return [rulesetMap, rulesetWords];
  }

  isWordRuleset(ruleset: SectionRuleset) {
    return ruleset.hasOwnProperty('words') || ruleset.hasOwnProperty('word');
  }

  isSymbolRuleset(ruleset: SectionRuleset) {
    return ruleset.hasOwnProperty('symbol') || ruleset.hasOwnProperty('symbols');
  }

  getSymbolRules(rulesets: SectionRuleset[]): [SymbolRulesetMap, string[]] {
    const rulesetSymbols: string[] = [];
    const rulesetMap: SymbolRulesetMap = {};

    rulesets.forEach((ruleset) => {
      // Don't add any non-symbol rulesets
      if (!this.isSymbolRuleset(ruleset)) {
        return;
      }

      const {symbols, symbol, ...rules} = ruleset as SymbolRuleset;
      const symbolsArray = symbols || (symbol && [symbol]) || [];
      for (const symbolValue of symbolsArray) {
        const symbolData = rulesetMap[symbolValue];
        let classNames = symbolData
          ? concatStringsUnique(rulesetMap[symbolValue].className, rules.className || '')
          : rules.className || '';

        rulesetMap[symbolValue] = {
          className: classNames,
          symbol: symbolValue,
          ...rules,
        }
        if (!rulesetSymbols.includes(symbolValue)) {
          rulesetSymbols.push(symbolValue);
        }
      }
    });

    return [rulesetMap, rulesetSymbols];
  }
}
