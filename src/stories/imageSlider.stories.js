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

export default {
  title: 'Image Slider',
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
