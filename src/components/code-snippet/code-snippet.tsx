import React from 'react';
import './code-snippet.scss';
import { concatStringsUnique, getNextUniqueId, removeClassNameFromString, removeClassNameByWhitelist } from '../../utils/utils';
import { CodeSnippetTSX, CodeSnippetSCSS } from './rulesets';

// Passed in by param
export type Rule = {
  // Aliases for "value"
  word?: string,
  words?: string[],
  symbol?: string,
  symbols?: string[],
  className?: string,
} & SectionOptions;

type SectionMap = {
  [id: string]: Section,
}

type Section = {
  id: string,
} & SectionData;

type SectionData = {
  value: string,
  className: string,
} & SectionOptions;

type SectionOptions = {
  // Apply the class name to the next section
  affectNextSibling?: boolean,
  // Apply the class name to the previous section
  affectPreviousSibling?: boolean,
  // Apply class name if siblings have values greater than one character
  siblingIsNotCharacter?: boolean,
  // Apply class name if siblings are immediately beside
  siblingIsConnected?: boolean,
  // Apply class name if sibling value matches any value in the list
  siblingWhitelist?: string[],
  // Apply class name if sibling value is not on the list
  siblingBlacklist?: string[],
  // Extends search beyond direct siblings
  // Search siblings until a sibling is hit with any of the given values
  searchUntilChar?: string[],
  // Search siblings until a valid one is found
  searchUntilValid?: boolean,
  // Only search forwards, for siblings in front
  searchNextOnly?: boolean,
  // Only search backwards, for siblings behind
  searchPreviousOnly?: boolean,
  // Only apply class name if it's contained in the whitelist
  // Siblings are not affected by this
  classNameWhitelist?: string,
  // Merges all sibling classnames, and applies it to them all
  // Does not affect the current section
  matchSiblings?: boolean,
  // Indent the next line when the character is hit
  indentNextLine?: number,
  indentCurrentLine?: number,
  // Used for end of line characters, for internal use only
  indentation?: number,
}

export type CodeSnippetProps = {
  children: string,
  className: string,
  lang?: string,
};

export class CodeSnippet extends React.Component<CodeSnippetProps> {
  sectionMap: SectionMap = {};
  sectionIds: string[] = [];
  ruleMap: {[id: string]: SectionData} = {};

  render () {
    const { lang } = this.props;
    let ruleset: Rule[] = [];
    let className = this.props.className || 'code-snippet';
    if (!lang || lang === 'tsx') {
      ruleset = CodeSnippetTSX;
      className += ' tsx';
    } else if (lang === 'scss') {
      ruleset = CodeSnippetSCSS;
      className += ' scss';
    }

    this.createRules(ruleset);
    this.createSections(this.props.children);
    this.applyRulesToSections();

    return (
      <pre className={className}>
        {this.createElementsFromSections()}
      </pre>
    );
  }

  createRules(rules: Rule[]) {
    for (const rule of rules) {
      const values = this.getValues(rule);
      // Remove aliases
      const { symbol, symbols, word, words, className, ...options } = rule;

      for (const value of values) {
        const existing = this.ruleMap[value];
        const existingClassName = existing ? existing.className : '';
        const newClassName = concatStringsUnique(existingClassName, className || '');
        this.ruleMap[value] = this.overrideObjectProperties(existing, {
          value,
          className: newClassName,
          ...options,
        });
      }
    }
  }

  overrideObjectProperties(obj1: any, obj2: any) {
    if (!obj1) {
      return obj2;
    }
    const newObj = Object.assign({}, obj1);

    const keys = Object.keys(obj2);
    for (const key of keys) {
      newObj[key] = obj2[key];
    }

    return newObj;
  }

  getValues(rule: Rule) {
    let values: string[] = [];
    if (rule.symbol) {
      values.push(rule.symbol);
    }
    if (rule.word) {
      values.push(rule.word);
    }
    if (rule.symbols) {
      values = values.concat(rule.symbols);
    }
    if (rule.words) {
      values = values.concat(rule.words);
    }

    return values;
  }

  createSections(code: string) {
    let sectionValue = '';
    let shouldStripIndentation = true;
    let indentation = 0;

    let currentLineIndent: Section | undefined;
    for (const char of code) {
      const charRules = this.ruleMap[char];

      if (shouldStripIndentation && char === ' ') {
        continue;
      } else {
        shouldStripIndentation = false;
      }

      // Add words
      if (charRules) {
        const rules = this.ruleMap[sectionValue];
        // Create a section for the string of characters
        if (sectionValue.length) {
          this.createNewSection(rules || {
            value: sectionValue,
            className: '',
          });
        }

        // Create a section for the character
        const id = this.createNewSection(charRules || {
          value: char,
          className: '',
        });

        if (char === '\n') {
          currentLineIndent = this.sectionMap[id];
          shouldStripIndentation = true;
          currentLineIndent.indentation = indentation;
        }
        if (char === '\n') {
          currentLineIndent = this.sectionMap[id];
        }

        if (charRules.indentCurrentLine && currentLineIndent) {
          indentation += charRules.indentCurrentLine;
          currentLineIndent.indentation = indentation;
        }
        if (charRules.indentNextLine) {
          indentation += charRules.indentNextLine;
        }

        sectionValue = '';
      } else {
        sectionValue += char;
      }
    }
  }

  createNewSection(section: SectionData): string {
    const newId = getNextUniqueId();
    this.sectionMap[newId] = {
      id: newId,
      ...section,
    };
    this.sectionIds.push(newId);

    return newId;
  }

  applyRulesToSections() {
    for (const id of this.sectionIds) {
      const section = this.sectionMap[id];
      this.updateSection(section);
    }
  }

  shouldCheckByValidity(section: Section): boolean {
    return (section.searchUntilValid || section.searchUntilChar ||
      section.affectNextSibling || section.affectPreviousSibling ||
      section.matchSiblings) !== undefined;
  }

  updateSection(section: Section, className?: string, sectionsUpdated: Section[] = []) {
    // If the section has already been updated within the callstack, then don't update it again
    if (sectionsUpdated.includes(section)) {
      console.error('Section has already been updated in the callstack');
      return;
    }
    sectionsUpdated.push(section);
    if (section.className === className) {
      return;
    }

    if (this.shouldCheckByValidity(section)) {
      const [valid, invalid] = this.getSiblingsByValidity(section);
      if (section.searchUntilChar && invalid.length) {
        section.className = removeClassNameFromString(section.className, this.getClassNameByValue(section.value));
      }

      if (section.affectNextSibling || section.affectPreviousSibling) {
        let affectedNext = !section.affectNextSibling;
        let affectedPrev = !section.affectPreviousSibling;
        for (const v of valid) {
          if (!affectedNext && this.isSiblingAfter(section, v)) {
            affectedNext = true;
            this.updateSection(v, section.className, sectionsUpdated);
          }
          if (!affectedPrev && this.isSiblingBefore(section, v)) {
            affectedPrev = true;
            this.updateSection(v, section.className, sectionsUpdated);
          }
          if (affectedPrev && affectedNext) {
            break;
          }
        }
      }

      if (section.matchSiblings) {
        let mergedClassNames = '';
        for (const v of valid) {
          mergedClassNames = concatStringsUnique(mergedClassNames, v.className);
        }
        for (const v of valid) {
          this.updateSection(v, mergedClassNames, sectionsUpdated);
        }
      }
    }

    if (className) {
      section.className = concatStringsUnique(section.className, className);
    }
  }

  getClassNameByValue(value: string): string {
    const rule = this.ruleMap[value];

    return rule ? rule.className : '';
  }

  isValidSibling(section: Section, sibling: Section) {
    if (section.siblingIsNotCharacter && sibling.value.length <= 1) {
      return false;
    }

    if (!this.isSiblingConnected(section, sibling)) {
      return false;
    }

    if (!this.siblingWithinWhitelist(section, sibling)) {
      return false;
    }

    if (this.siblingWithinBlacklist(section, sibling)) {
      return false;
    }

    return true;
  }

  siblingWithinBlacklist(section: Section, sibling: Section) {
    if (!section.siblingBlacklist) {
      return false;
    }

    return section.siblingBlacklist.includes(sibling.value);
  }

  siblingWithinWhitelist(section: Section, sibling: Section) {
    if (!section.siblingWhitelist) {
      return true;
    }

    return section.siblingWhitelist.includes(sibling.value);
  }

  isSiblingConnected(section: Section, sibling: Section): boolean {
    if (!section.siblingIsConnected) {
      return true;
    }

    const sectionIndex = this.sectionIds.indexOf(section.id);
    const siblingIndex = this.sectionIds.indexOf(sibling.id);

    return Math.abs(sectionIndex - siblingIndex) <= 1;
  }

  getSectionByIndex(index: number): Section | undefined {
    return this.sectionMap[ this.sectionIds[index] ];
  }

  getSectionById(id: string): Section {
    return this.sectionMap[id];
  }

  isSiblingAfter(section: Section, sibling: Section): boolean {
    const index = this.getIndex(section);
    const siblingIndex = this.getIndex(sibling);

    return (index - siblingIndex) < 0;
  }

  isSiblingBefore(section: Section, sibling: Section): boolean {
    const index = this.getIndex(section);
    const siblingIndex = this.getIndex(sibling);

    return (index - siblingIndex) > 0;
  }

  shouldCheckSibling(section: Section, sibling?: Section): boolean {
    if (!sibling) {
      return false;
    }

    if (section.siblingIsConnected) {
      return this.isSiblingConnected(section, sibling);
    }

    if (section.searchUntilChar && section.searchUntilChar.includes(sibling.value)) {
      return false;
    }

    if (section.searchNextOnly && this.isSiblingBefore(section, sibling)) {
      return false;
    }

    if (section.searchPreviousOnly && this.isSiblingAfter(section, sibling)) {
      return false;
    }

    const shouldBeConnected = !section.searchUntilChar && !section.searchUntilValid;
    if (shouldBeConnected && (section.affectNextSibling || section.affectPreviousSibling)) {
      return this.isSiblingConnected(section, sibling);
    }

    return true;
  }

  getSiblingsByValidity(section: Section): [Section[], Section[]] {
    const ids = this.sectionIds;
    const sectionIndex = this.sectionIds.indexOf(section.id);
    let stopCheckingNext = false;
    let stopCheckingPrev = false;
    const validSiblings: Section[] = [];
    const invalidSiblings: Section[] = [];
    for (let i = 1; i < ids.length; i += 1) {
      const nextSibling = this.getSectionByIndex(sectionIndex+i);
      const prevSibling = this.getSectionByIndex(sectionIndex-i);
      if (!this.shouldCheckSibling(section, prevSibling)) {
        stopCheckingPrev = true;
      }
      if (!this.shouldCheckSibling(section, nextSibling)) {
        stopCheckingNext = true;
      }
      if (stopCheckingNext && stopCheckingPrev) {
        break;
      }

      if (!stopCheckingNext) {
        const isNextValid = this.isValidSibling(section, nextSibling!);
        if (!isNextValid) {
          invalidSiblings.push(nextSibling!);
        } else {
          validSiblings.push(nextSibling!);
          if (section.searchUntilValid) {
            stopCheckingNext = true;
          }
        }
      }

      if (!stopCheckingPrev) {
        const isPrevValid = this.isValidSibling(section, prevSibling!);
        if (!isPrevValid) {
          invalidSiblings.push(prevSibling!);
        } else {
          validSiblings.push(prevSibling!);
          if (section.searchUntilValid) {
            stopCheckingPrev = true;
          }
        }
      }
    }

    return [validSiblings, invalidSiblings];
  }

  getIndex(section: Section): number {
    return this.sectionIds.indexOf(section.id);
  }

  getNextSection(section: Section): Section | undefined {
    const index = this.getIndex(section);
    return this.getSectionByIndex(index+1);
  }

  createElementsFromSections() {
    const children = [];
    let combinedValues = '';
    let prevSection: Section | undefined;
    let prevClassName: string | undefined;
    for (const id of this.sectionIds) {
      const section = this.sectionMap[id];
      let className = section.className.length ? section.className : undefined;
      if (className && section.classNameWhitelist) {
        className = removeClassNameByWhitelist(className, section.classNameWhitelist);
      }

      const isLast = this.sectionIds.indexOf(section.id) === this.sectionIds.length-1;
      if (prevSection && prevClassName !== className || isLast) {
        children.push(<span key={prevSection!.id} className={prevClassName}>{combinedValues}</span>);
        combinedValues = '';
      }

      if (isLast) {
        children.push(<span key={section.id} className={className}>{section.value}</span>);
      }


      combinedValues += section.value;
      prevClassName = className;
      prevSection = section;
      if (section.indentation && section.indentation >= 0) {
        combinedValues += ' '.repeat(section.indentation);
      }
    }

    return children;
  }
}
