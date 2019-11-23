import React from 'react';
import { ImageSlider } from '../../components/image-slider/image-slider';
import { Image } from '../../components/image/image';
import { Caption } from '../../components/caption/caption';
import { ImageViewer } from '../../components/image-viewer/image-viewer';
import WireframeLayout1 from './imgs/wireframe-layout-1.png';
import WireframeLayout2 from './imgs/wireframe-layout-2.png';
import WireframeLayout3 from './imgs/wireframe-layout-3.png';
import WireframeLayout4 from './imgs/wireframe-layout-4.png';
import WireframeLayout5 from './imgs/wireframe-layout-5.png';
import WireframeLayout6 from './imgs/wireframe-layout-6.png';
import WireframeLayout7 from './imgs/wireframe-layout-7.png';
import WireframeLayout8 from './imgs/wireframe-layout-8.png';
import WireframeMain1 from './imgs/wireframe-main-1.png';
import WireframeMain2 from './imgs/wireframe-main-2.png';
import WireframeMain3 from './imgs/wireframe-main-3.png';
import GridItem1 from './imgs/grid-item-1.png';
import GridItem2 from './imgs/grid-item-2.png';
import GridItem3 from './imgs/grid-item-3.png';
import EpicExample from './imgs/epic-example.png';
import TitleComparison from './imgs/title-comparison.png';
import Main1 from './imgs/main-1.png';
import Main2 from './imgs/main-2.png';
import Main3 from './imgs/main-3.png';
import Main4 from './imgs/main-4.png';
import Landing1 from './imgs/landing-1.png';
import Landing2 from './imgs/landing-2.png';
import Landing3 from './imgs/landing-3.png';
import Landing4 from './imgs/landing-4.png';
import Landing5 from './imgs/landing-5.png';
import Footer1 from './imgs/footer-1.png';
import Footer2 from './imgs/footer-2.png';
import Footer3 from './imgs/footer-3.png';
import Footer4 from './imgs/footer-4.png';
import TreeList1 from './imgs/tree-list-1.png';
import TreeList2 from './imgs/tree-list-2.png';
import TreeList3 from './imgs/tree-list-3.png';
import Overview from './imgs/overview.png';
import BlogStyle from './imgs/blog-style.png';


export function PortfolioProjectOverview() {

  let captionNum = 0;
  return (
    <div className='blog-container'>
      <h1>Creating a Portfolio Website</h1>
      <p>
        Dark, minimalistic, and straight to the point was my goal. When a visitor first loads the site, I wanted my name and title to be promonently presented as if it was a business card. As they scroll, each project having enough information to get a good sense of what they're about. Once they reach the bottom, my contact details being displayed at the footer. I didn't want any unneccessary clicks.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Variations of the main page from wireframes to the final design</>)}
      >
        <ImageSlider style={{maxHeight: '50em'}}>
          <Image src={WireframeMain1}></Image>
          <Image src={WireframeMain2}></Image>
          <Image src={WireframeMain3}></Image>
          <Image src={Main1}></Image>
          <Image src={Main2}></Image>
          <Image src={Main3}></Image>
          <Image src={Main4}></Image>
        </ImageSlider>
      </Caption>
      <p>
        Initially I wanted to layout the projects as a grid, but I opted to show them as a list instead. Grid views seem to be commonly used for services or storefronts, who deal with hundreds of items. At least at the time of writing, I don't see myself adding more than 5 items any time soon. I used a list to allow for more white space, and to allow the projects to be more easily scanned from top to bottom.
      </p>
      <p>
        Colour was used to make key elements pop, such as the title or project details. Gray was also used to lessen the visual impact of certain elements, such as descriptions or subtitles. Font size was also used for the same reason, as was font family.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Comparison between titles</>)}
      >
        <ImageViewer>
          <Image src={TitleComparison}></Image>
        </ImageViewer>
      </Caption>
      <p>
        Roboto and Vollkorn were used as fonts. I love the simplicity of Roboto, and Vollkorn seemed to fit it well as a serif font - this font was used for headers to give them more weight.
      </p>
      <p>
        The landing image was also removed in favour of a dynamic card. I felt this fit better with the aesthetics, while hopefully making the initial impression more memorable.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Different designs for the landing page</>)}
      >
        <ImageSlider>
          <Image src={Landing1}></Image>
          <Image src={Landing2}></Image>
          <Image src={Landing3}></Image>
          <Image src={Landing4}></Image>
          <Image src={Landing5}></Image>
        </ImageSlider>
      </Caption>
      <p>
        I wanted the footer to contain my contact information, as well as any other relevant links. I never really use Twitter, but I saw that as a good way to informally contact me. A sort of text messaging without needing to know my cellphone number.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Different designs for the footer</>)}
      >
        <ImageSlider style={{minHeight: '12em'}}>
          <Image src={Footer1}></Image>
          <Image src={Footer2}></Image>
          <Image src={Footer3}></Image>
          <Image src={Footer4}></Image>
        </ImageSlider>
      </Caption>
    </div>
  );
}
