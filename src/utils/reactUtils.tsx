import React from 'react';
import { isNumber } from 'util';

const keywords = [{
    colour: '#e276da',
    words: ['export', 'import', 'from', 'for', 'if', 'else', 'return'],
  },
  {
    colour: '#2e89d4',
    words: ['function', 'let', 'const'],
  },
  {
    colour: '#7FB785',
    words: ['React', 'ReactNode', 'string']
  }
];


export function parseStringSyntax(s: string) {
  const children: React.ReactNode[] = [];
  let word = '';

  for (let i=0; i < s.length; i += 1) {
    const char = s[i];

    if (isEndOfWordCharacter(char)) {
      if (word.length !== 0) {
        if (char === '(') {
          children.push(highlightWord(word, '#ffd77e'))
        } else if (!isNaN(Number.parseFloat(word))) {
          children.push(highlightWord(word, '#6aea78'));
        } else {
          children.push(highlightWord(word))
        }
      }

      if (isEndOfLineCharacter(char)) {
        children.push(<br />);
      } else if (char === ' ') {
        children.push(<>&nbsp;</>);
      } else if (isString(char)) {
        children.push(highlightWord(char, '#e46a4f'))
      } else {
        children.push(char);
      }
      word = '';
    } else {
      word += char;
    }

  }

  return children;
}

function isString(char: string) {
  return [`'`, `"`, '`'].includes(char);
}

function highlightWord(word: string, colour = getKeywordColour(word)): React.ReactNode {
  if (colour) {
    return (<span style={{color: colour}}>{word}</span>);
  } else {
    return (<span style={{color: '#9CDCF0'}}>{word}</span>)
  }
}

function getKeywordColour(word: string) {
  for (const keyword of keywords) {
    if (keyword.words.includes(word)) {
      return keyword.colour;
    }
  }

  return;
}

function isEndOfWordCharacter(char: string) {
  const endOfWordChars = getEndOfWordCharacters();

  return endOfWordChars.includes(char);
}

// Get array of characters that are considered to mark the end of a word
// eg. if a space is found, then the string of characters that came before must be a word
function getEndOfWordCharacters() {
  return [' ', ';', '.', '=',, '-', '+', '\n','(', ')', '{', '}', '[', ']', `'`,
          `"`, '`', '<', '>', '!', ':'];
}

function isEndOfLineCharacter(char: string) {
  return char === '\n';
}
