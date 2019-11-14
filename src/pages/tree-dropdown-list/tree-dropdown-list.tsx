import React from 'react';
import Bookshelf from './imgs/bookshelf.png';
import ListExample from './imgs/list-example.png';
import RadioExample2 from './imgs/radio-example-2.png';
import ListExampleExpanded1 from './imgs/list-example-expanded-1.png';
import ListExampleExpanded2 from './imgs/list-example-expanded-2.png';
import RadioExample from './imgs/radio-example.png';
import RadioExampleExpanded1 from './imgs/radio-example-expanded-1.png';
import RadioExampleExpanded2 from './imgs/radio-example-expanded-2.png';
import Select2Example from './imgs/select2-example.png';
import { Caption } from '../../components/caption/caption';
import { ImageViewer } from '../../components/image-viewer/image-viewer';
import { Image } from '../../components/image/image';
import { ImageSlider } from '../../components/image-slider/image-slider';

export function TreeDropdownList() {

  let captionNum = 0;
  return (
    <div className='blog-container'>
      <h1>Creating a tree dropdown list</h1>
      <p>
        This was a task for ActiveTextbook, which is a product created by Evident Point that allows books to be added, read, and managed. These books can be given categories, as well as child categories. While child categories were not supported on the front-end for user use, it was certainly a future concern. I was tasked with adding support for tree structures for category dropdown menus in light of this concern.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Bookshelf page of ActiveTextbook</>)}
      >
        <ImageViewer>
          <Image src={Bookshelf}></Image>
        </ImageViewer>
      </Caption>
      <h2>The Problem</h2>
      <p>
        The dropdown was using Select2 (a JQuery replacement for dropdown menus), but this library didn't guarantee support for multileveled child categories. It was also cumbersome to change the styling and functionality of this dropdown menu to behave as we wanted.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Category dropdown list created with Select2</>)}
      >
        <ImageViewer>
          <Image src={Select2Example}></Image>
        </ImageViewer>
      </Caption>
      <h2>The Solution</h2>
      <p>
        The solution was to create a dropdown menu of our own, one that would not only function as we expected, but also match the codebase and styling of Active Textbook.
      </p>
      <p>
        The notable goals of this solution being:
      </p>
      <ul>
        <li>Staying consistent with our existing codebase</li>
        <li>Allow unlimited children, with appropriate behaviour</li>
        <li>Create a quality foundation for future styles / modifications</li>
      </ul>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> New category dropdown list</>)}
      >
        <ImageViewer>
          <Image src={RadioExample}></Image>
        </ImageViewer>
      </Caption>
      <h2>Multi-Style Support</h2>
      <p>
        With Active Textbook (ATB), two different visual styles were used for the category dropdown menu's. One with a radio, and one as a plain list (for lack of better words). It's entirely possible that in the future additional styles will be needed, and so it was important to make the process of adding styles easy and familiar.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Comparison between collapsed styles</>)}
      >
        <ImageViewer>
          <Image src={RadioExample2}></Image>
          <Image src={ListExample}></Image>
        </ImageViewer>
      </Caption>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Comparison between expanded styles</>)}
      >
        <ImageViewer>
          <Image src={RadioExampleExpanded1}></Image>
          <Image src={ListExampleExpanded1}></Image>
        </ImageViewer>
      </Caption>
      <h2>Selection Behaviour</h2>
      <p>
        The selectable list was given a behaviour similar to a radio input, but with extended functionality to support children and parents. Specifically, selecting an option will select its children, as well as highlighting its parent. These additional features were added to make it clear that a selection will encompass its children, and to show which parent a selection belongs to (specifically in the scenario where a parent is collapsed).
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Comparison between fully expanded lists</>)}
      >
        <ImageViewer>
          <Image src={RadioExampleExpanded2}></Image>
          <Image src={ListExampleExpanded2}></Image>
        </ImageViewer>
      </Caption>
      <h2>Learning Outcomes</h2>
      <p>
        I learned how important code consistency was. With a team of developers all working on different tasks, it can be a bit jarring to run into different code structures since the purpose of the code may not always be immediately clear. If the code style remains the same, then everyone can more effectively understand how the code works, as well as what its purpose is.
      </p>
      <p>
        By following the existing code structure, I also expanded my own set of coding skills. I was able to think of multiple solutions, and then decide upon the one that best fit with the existing codebase. Overall, I grew to be far more comfortable with Javascript, and I got a significantly better understanding of the language.
      </p>
    </div>
  );
}
