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
import { parseStringSyntax } from '../utils/reactUtils';

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
