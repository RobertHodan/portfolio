import React from 'react';
import SpanExample1 from './imgs/span-example.png';
import SpanExample2 from './imgs/span-example-2.png';
import DivExample1 from './imgs/div-example-1.png';
import DivExample2 from './imgs/div-example-2.png';
import DivExample3 from './imgs/div-example-3.png';
import DivExample4 from './imgs/div-example-4.png';
import DivExample5 from './imgs/div-example-5.png';
import { Caption } from '../../components/caption/caption';
import { ImageViewer } from '../../components/image-viewer/image-viewer';
import { Image } from '../../components/image/image';
import { ImageSlider } from '../../components/image-slider/image-slider';

export function TextHighlighter() {

  let captionNum = 0;
  return (
    <div className='blog-container'>
      <h1>Adding text highlight support</h1>
      <p>
        This project was for an EPUB reader that I worked on while employed by Evident Point Software. It was a solo task, meant to recreate an existing feature using new technologies.
      </p>
      <p>
        My task was to create a system that can highlight selected text on a web page. However, I had to create this system with iframes in mind. Dealing with iframes can create for particularly tricky scenarios, especially if modifying them is desired. An iframe is essentially a whole other web page, and that means it can execute its own Javascript code at any point after the page loads. These iframes don’t know anything about the web pages that they live in, and thankfully so. This restriction means that any code they run is limited to their own little world. However, to modify an iframe a hole must be poked into it, but with every puncture there are more and more potential weaknesses for malicious code to exploit. This is where a library called Readium Glue JS comes in.
      </p>
      <p>
        As a brief summary, Readium Glue JS injects a portion of itself into the iframe, and the other half lives in the web page. I like to think of this as creating a single puncture into the iframe, as a bridge between the two worlds. This bridge doesn’t allow any code or references to walk on by, and instead only notes can be passed between them. Of course, code on both sides still needs to act on these notes, and that too can cause issues. However, it’s far more manageable to deal with, as we can proof read the notes we’re given, and we have full control over whether or not to act on them from our side of the bridge. While this isn’t the focus of this report, I still thought it was necessary to describe the context of this project.
      </p>
      <p>
        When it came down to creating the highlight system itself, I had to figure out what approaches I could take, and it seemed to be done in one of two ways:
      </p>
      <ul>
        <li>Wrap the intended text with a new element.</li>
        <li>Overlay the text with a new element.</li>
      </ul>
      <p>
        The first solution is to wrap the selected text with a new element, and then at that point I  just have to style the element to make it look like the text is highlighted. At that point, I could call it a day. It seemed very simple, but my quick dive into it shed some concerns.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Examples showing a highlight with the span solution</>)}
      >
        <ImageViewer>
          <Image src={SpanExample1}></Image>
          <Image src={SpanExample2}></Image>
        </ImageViewer>
      </Caption>
      <p>
        The first concern, being the scenario where two highlights are made, but they both overlap a single word. In order to get two highlights to show an overlap, three new elements would have to be created, due to how HTML elements are created. This could be kept simple with no overlapping being allowed, but each highlight is still modifying the content directly. On a web page, a paragraph is represented with a “&lt;/p>&lt;p>” tag, and any text that it may hold is represented as its own object - a text node. So, in order to wrap a portion of text with this highlight element, I would need to split that text node into at least two separate objects before I can insert my own element. Once a text node is split into two, it won’t automatically repair itself. I would have to copy that text, and merge it back into its original node. All of this is directly modifying the data itself - if at any point something goes wrong, a portion of the page could have been deleted or modified in an unintended way. If at any point assumptions are made regarding the structure of the iframe, then modifying the iframe may cause portions of the web site to break.
      </p>
      <p>
        This is where the strength of the second solution really shines - the modification of the document can be kept to a minimum. The highlight elements still need to be inserted into the document tree, but I have full control on where to place them. I could create a container to hold them all, and then place it where it least affects the rest of the application. This also means that this system wouldn’t be limited to the content on the page, and could actually be used to arbitrarily create rectangles anywhere on it. Overlapping highlights becomes trivial as a result.  However, this comes at a cost - these highlights need to be explicitly told where to go. For example, the position, width, and height of each row in the text selection would need to be calculated. For every row that varies in size, a new element would need to be created to highlight that row.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Examples showing a highlight using the div solution</>)}
      >
        <ImageSlider style={{minHeight: '18em'}}>
          <Image src={DivExample1}></Image>
          <Image src={DivExample2}></Image>
          <Image src={DivExample3}></Image>
        </ImageSlider>
      </Caption>
      <p>
        What’s worse, is that when the state of the document changes, then these highlights may need to be recalculated - such as when resizing the iframe. An additional problem is that a text selection could very well include images or other non-text elements. If I only want text to be highlighted, then I would have to check every single element within that selection to make sure that only text nodes are highlighted. The first solution shines in this regard, as it will automatically update along with layout changes.
      </p>
      <p>
        Both solutions have their benefits, and deciding between them wasn’t easy. In my situation, I was creating a highlight system for Readium - an e-book reading architecture. This architecture uses identifiers known as CFI’s to mark locations in a book. These CFI’s work based on the document structure of the book, which means that the first solution would unfortunately break a lot of functionality. The assumption made with e-books is that their document structure is static, and won’t change as a user is reading through it. To keep the burden on myself, I opted to implement the second solution.
      </p>
      <p>
        I created a container to hold all the highlights, and appended that at the bottom of the document. My logic was that appending this to the end of the iframe document should avoid any issues with CFIs. For the highlights themselves, I used div elements for every rectangle, and I placed them into a container of their own.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Basic HTML structure of highlights</>)}
      >
        <ImageViewer>
          <Image src={DivExample4}></Image>
        </ImageViewer>
      </Caption>
      <p>
        The next step was to give each highlight a unique identifier, so that it could be retrieved, modified, or removed from the document. I didn’t see a purpose to have two highlights share a single selection range, and so I decided to add this as a restriction. This served as a convenient solution, as the selection range could now be used as that unique identifier that I was looking for. To turn this range into an element id, I simply had to turn it into a string, and then remove the white spaces from it.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> HTML structure with required data</>)}
      >
        <ImageViewer>
          <Image src={DivExample4}></Image>
        </ImageViewer>
      </Caption>
      <p>
        Creating these highlights was done using Javascript, as well as Readium Glue JS. This module had only two purposes - to create a highlight, and to delete a highlight. The logic being that additional features (such as changing the highlight colour) could just be implemented when they’re needed. My biggest take-away from this was that, the simplest solution isn’t always the best one. The first solution was simpler for me, but it would have created a lot of problems for others.
      </p>
      <p>
        The book shown in in these examples was from a selection of Epub samples, found here: http://idpf.github.io/epub3-samples/30/samples.html. The book in question was Moby Dick.
      </p>
    </div>
  );
}
