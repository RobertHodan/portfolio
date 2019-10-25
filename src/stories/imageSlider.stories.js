import React from 'react';
import { getNextUniqueId } from '../utils/utils';

import 'normalize.css';
import { ImageViewer } from '../components/image-viewer/image-viewer';
import image from '../projects/placeholder.png';
import svg from '../logo.svg';
import svg2 from '../icons/twitter.svg';
import image2 from '../projects/placeholder2.png';
import './storyStyles.scss';
import { ImageSlider } from '../components/image-slider/image-slider';
import { Image } from '../components/image/image';
import { Caption } from '../components/caption/caption';
import { CodeSnippet } from '../components/code-snippet/code-snippet';
import { rulesetTSX, CodeSnippetTSX } from '../components/code-snippet/rulesets';

export default {
  title: 'Image Slider',
};

export const ImageExample = () => {

  return (
    <Image
      src={ image }
    ></Image>
  )
};

export const ImageViewerExample = () => {

  return (
    <ImageViewer>
      <Image
        src={ image }
      ></Image>
    </ImageViewer>
  )
};

export const ImageSliderControllerExample = () => {

  return (
    <ImageSlider
      style={{
        height:'300px',
      }}
    >
      <Image
        src={ image }
      ></Image>
      <Image
        src={ image2 }
      ></Image>
      <Image
        src={ svg }
      ></Image>
      <Image
        src={ svg2 }
      ></Image>
    </ImageSlider>
  )
};

export const ImageSliderControllerWithCaptionExample = () => {
  return (
    <Caption
      caption={(<><i>Figure 1: </i>A collection of images showing [something]</>)}
    >
      <ImageSlider
      style={{
        height:'300px',
      }}
    >
      <Image
        src={ image }
      ></Image>
      <Image
        src={ image2 }
      ></Image>
      <Image
        src={ svg }
      ></Image>
      <Image
        src={ svg2 }
      ></Image>
     </ImageSlider>
    </Caption>
  )
}

export const ImageViewerWithCaptionExample = () => {
  return (
    <Caption
      caption={(<><i>Figure 1: </i>A comparison showing [difference]</>)}
    >
      <ImageViewer>
        <Image
          src={ image }
        ></Image>
        <Image
          src={ image2 }
        ></Image>
      </ImageViewer>
    </Caption>
  )
}

export const parseText = () => {
  return (
    <>
    <CodeSnippet>
     {`export function parseStringSyntax(s: string) {
      const children: React.ReactNode[] = [];
      let word = '';

      for (let i=0; i < s.length; i += 1) {
        const char = s[i];

        if (this.isEndOfWordCharacter(char) && something()) {
          if (word.length !== 0) {
            children.push(highlightWord(word));
          }
          word = 'rwarwawste';
        }
      }

      return children;
    }`}
    </CodeSnippet>
    <CodeSnippet
      lang='scss'
    >
    {`.code-snippet {
  font-family: 'Consolas', 'Courier New', 'monospace';
  font-weight: 300;
  background: rgb(29, 29, 29);

  &.is-conditional {
    color: #d276cb;
  }

  .is-decleration {
    color: #298fe2;
  }

  &.is-type {
    color: #2bca9e;
  }

  > .is-method {
    color: #fff8a0;
  }

  .is-number {
    color: #bee6a5;
    border-left: 0.4em solid $highlight-color-primary;
    width: 100%;
    max-height: 422px;
    padding: 10em 5em;
  }

  .is-string {
    color: #e46a4f;
  }

  .is-word {
    color: #9CDCF0;
  }
}`}
   </CodeSnippet>
   </>
  );
}
