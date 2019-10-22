import React from 'react';
import './code-snippet.scss';

const keywords = [{
    className: 'is-conditional',
    words: ['export', 'import', 'from', 'for', 'if', 'else', 'return'],
  },
  {
    className: 'is-declaration',
    words: ['function', 'let', 'const', 'this'],
  }
];

type CodeSnippetProps = {
  children: string,
  indentation: number,
  className: string,
};

// For my purposes, I'll never need code snippets to update.
// Renders just a single time
export const CodeSnippet = React.memo(
  function CodeSnippetMemo(props: CodeSnippetProps) {
    return (
      <pre className={props.className || 'code-snippet tsx'}>
        {highlightSyntax(props.children, props.indentation || 2)}
      </pre>
    )
  }
  // Ensure it only renders a single time
  , () => true
);

function highlightSyntax(s: string, indentation: number) {
  const children: React.ReactNode[] = [];
  let word = '';
  let nextWordClass = '';
  let indentationLevel = 0;
  const sentences = s.split('\n');
  let stringInProgress = false;

  // Stop React from complaining. Give each span it's own key.
  let key=0;

  for (let i=0; i < s.length; i += 1) {
    const prevChar = s[i-1] || '';
    const char = s[i];
    const nextChar = s[i+1] || '';

    // Check for special cases
    if (!word.length) {
      if (prevChar === ':') {
        nextWordClass += 'after-colon ';
      }
      if (prevChar === '#') {
        nextWordClass += 'after-hash ';
      }
      if (char === '.') {
        nextWordClass += 'after-period ';
      }
    }

    // Check if a completed word needs a specific colour
    // Make an exception for dashes when it doesn't join words
    if (isEndOfWordCharacter(char)
      || (char === '-' && isEndOfWordCharacter(prevChar) && isEndOfWordCharacter(nextChar))
    ) {
      const keywordClassName = getKeywordClassName(word);
      if (word.length !== 0) {
        // Check if this should be a string
        if (stringInProgress) {
          nextWordClass = '';
          children.push(highlightWord(word, key+=1, 'is-string'));
        // An opening bracket marks the beginning of a method
        } else if (char === '(') {
          children.push(highlightWord(word, key+=1, 'is-method'));
          nextWordClass = '';
        } else if (keywordClassName.length) {
          children.push(highlightWord(word, key+=1, keywordClassName));
        // Check for a number
        } else if (!isNaN(Number.parseFloat(word))) {
          children.push(highlightWord(word, key+=1, 'is-number'));
        // Check if a word needs a colour based on a previous character
        } else if (nextWordClass.length) {
          children.push(highlightWord(word, key+=1, nextWordClass));

          // Continue the colour to the next word when periods are used
          if (char !== '.') {
            nextWordClass = '';
          }
        } else {
          nextWordClass += 'is-word ';
          children.push(highlightWord(word, key+=1, nextWordClass));
        }
      }

      // Check if a linebreak is needed
      if (isEndOfLineCharacter(char)) {
        children.push(<br key={key+=1} />);
        nextWordClass = '';

        // Indent code
        if (sentences[0].includes('{')) {
          indentationLevel += indentation;
        }
        if (sentences[1].includes('}')) {
          indentationLevel -= indentation;
        }
        sentences.shift();

        children.push(<span key={key+=1}>{createSpaces(indentationLevel)}</span>);
      // Check if the character needs a string colour
      } else if (isString(char)) {
        stringInProgress = !stringInProgress;
        children.push(highlightWord(char, key+=1, 'is-string'));
      } else if (char === '.') {
        children.push(highlightWord(char, key+=1, 'is-period'));
      } else if (char === '&') {
        children.push(highlightWord(char, key+=1, 'is-ampersand'));

      // Don't preserve any spaces that would have been used to indent,
      // so that the indentation can be determined programmatically
      } else if (
        // A space between non-space characters is valid
        (char === ' ' && char !== prevChar && char !== nextChar) ||
        // Any non-space characters are valid
        char !== ' '
      ) {
        children.push(<span key={key+=1}>{char}</span>);
      }
      word = '';
    } else if (char !== ' ') {
      word += char;
    }
  }

  return children;
}

function createSpaces(num: number) {
  return String(' ').repeat(num);
}

function isString(char: string) {
  return [`'`, `"`, '`'].includes(char);
}

function highlightWord(word: string, key: number, className = getKeywordClassName(word)): React.ReactNode {
  return (<span className={className} key={key}>{word}</span>);
}

function getKeywordClassName(word: string) {
  for (const keyword of keywords) {
    if (keyword.words.includes(word)) {
      return keyword.className;
    }
  }

  return '';
}

function isEndOfWordCharacter(char: string) {
  const endOfWordChars = getEndOfWordCharacters();

  return endOfWordChars.includes(char);
}

// Get array of characters that are considered to mark the end of a word
// eg. if a space is found, then the string of characters that came before must be a word
function getEndOfWordCharacters() {
  return [' ', ';', '.', '=', '+', '\n','(', ')', '{', '}', '[', ']', `'`,
          `"`, '`', '<', '>', '!', ':', ',', '&'];
}

function isEndOfLineCharacter(char: string) {
  return char === '\n';
}
