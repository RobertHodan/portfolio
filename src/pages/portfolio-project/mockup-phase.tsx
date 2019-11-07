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


export function MockupPhase() {

  let captionNum = 0;
  return (
    <div className='blog-container'>
      <h1>Mockup</h1>
      <p>
        Going in, I was mostly focused on the aesthetics of the website - I really wanted a strong initial impression. However, I also wanted to go with a design that spoke to me, and so I set myself following goals:
      </p>
      <ul>
        <li>Dark</li>
        <li>Simplistic / Minimal</li>
        <li>Polished</li>
      </ul>
      <p>
        I knew that these goals would be difficult to achieve, but they also provide a great opportunity to explore and discover new challenges. With a “dark” theme, I wanted to stick to grayscale - the only colours being provided by images. I wanted to try my best to restrict myself as much as possible to fit with my minimalistic goal, and only add elements that are necessary. I really like minimalistic designs, and I thought it would be perfect for a portfolio given the limited information on screen.
      </p>
      <p>
        For me, minimalism meant that I should embrace whitespace, and use as few elements as possible to create lines. Preferably, using the text and images to create boundaries between different sections of the page.
      </p>
      <p>
        My final goal was to achieve a polished look. For me, this meant adding transitions to bridge different states together. I wanted a nice balance where no element would instantaniously pop into view, but still being subtle     enough that the UI wouldn’t feel slow.
      </p>
      <h1>Wireframes</h1>
      <p>
        My main goal with the wireframes was just to explore different layouts that I could use. I really wanted a grid layout, and so I spend some time trying out different layouts to see if anything could work. I also brainstormed other layouts as well. I particularly liked the idea of an actual timeline layout, with the start / end dates above and below the projects. I quickly dropped that idea though, as I thought it may be a little too confusing at a glance. I wanted a layout that was easier to digest for someone that may want to just take a quick look and quickly scroll through the page.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Wireframes of potential grid layouts</>)}
      >
        <ImageSlider style={{maxHeight: '30em'}}>
          <Image src={WireframeLayout1}></Image>
          <Image src={WireframeLayout2}></Image>
          <Image src={WireframeLayout3}></Image>
          <Image src={WireframeLayout4}></Image>
          <Image src={WireframeLayout5}></Image>
          <Image src={WireframeLayout6}></Image>
          <Image src={WireframeLayout7}></Image>
          <Image src={WireframeLayout8}></Image>
        </ImageSlider>
      </Caption>

      <p>
        I didn’t explore very much when it came to the overall layout of the main page. I knew I wanted a header, and I liked the idea of using an image to give the page a little more life. Afterwards, I added a “contact me” footer, since it seemed fitting to see contact details after scrolling past all the projects. This gave me a fairly simple layout to start out with.
      </p>
      <p>
        I had also decided on the fonts I would use. I chose to use Roboto for most of the text, with exception to headers where I opted to use Vollkorn. I felt like Vollkorn paired nicely with Roboto. It’s fairly similar, but it stands out more due to it being a serif font. I wanted a similar font to Roboto so that headers wouldn’t be too jarring, but I also wanted headers to stand out without bolding them.
      </p>
      <p>
        I wasn’t confident that the final wireframe would represent my final mockup, but I saw this phase as simply trying to discover possible layout ideas. I was fairly adamant about keeping the contact and header sections where they were, though. I didn’t want to stray too far from convention in this regard, since I wanted the average person to know where they can find my contact information before they even open the web page. The last thing I wanted was for anyone feel like they’re “hunting” any information that they wanted to find.
      </p>

      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Wireframes of the main menu</>)}
      >
        <ImageSlider style={{maxHeight: '60em'}}>
          <Image src={WireframeMain1}></Image>
          <Image src={WireframeMain2}></Image>
          <Image src={WireframeMain3}></Image>
        </ImageSlider>
      </Caption>

      <h1>Grid View</h1>
      <p>
        Initially, I really wanted to have a grid on the main page. I really liked the idea that all the projects could be glanced at without the need to scroll down the page.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Initial design of grid item</>)}
      >
        <ImageViewer>
          <Image src={GridItem1}></Image>
        </ImageViewer>
      </Caption>
      <p>
        A light grey box representing an image, with a dark gray box holding necessary project information. The challenge here was deciding on the image size and dimensions.
      </p>
      <p>
        I took a look at several websites that use grid items, and the width seemed to range from 1.3 to 1.8 times that of the height. I opted to go closer to 1.3 so that three items can comfortably fit on a 1080p screen and not feel squished.
      </p>
      <p>
        At this point, I remembered that the <a href='https://www.epicgames.com/'>Epic Games</a> used a dark theme as well, as well as launching a online store of their own. I suspected they would likely use a grid system for displaying store items, and sure enough that was the case. Surprisingly, their grid items were fairly similar to my own, but there were three main differences:
      </p>
      <ul>
        <li>Smaller font size</li>
        <li>Use of hierarchy</li>
        <li>Displays a third piece of information under title</li>
      </ul>
      <p>
        The font size was 14px as opposed to the 18px that I was using. It made me realize that it gave content more room to breath, while still being a comfortable reading size. I also liked their use of hierarchy; The picture is the largest element of the item, followed by a bolded price, a title, and finally the publisher name with a darker font color. It makes a nice assumption as to what the average player may care about the most, or what may be most relevant to them at a glance.
      </p>
      <p>
        Their use of spacing was also nice, keeping the title and publisher closer together. It makes them appear as one unit at a glance, and I found that to be more aesthetically pleasing. The final difference, was having a third piece of information under the title - in this case, having the publisher name under the title of the game.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Comparison between <a href='https://www.epicgames.com/store/en-US/'>Epic Game Store</a> (left) versus my revised mockup (right)</>)}
      >
        <ImageViewer>
          <Image src={EpicExample}></Image>
          <Image src={GridItem2}></Image>
        </ImageViewer>
      </Caption>
      <p>
        It didn’t take long for me to be inspired by their design (as can be seen in Figure 2). I realized that having the company name below the project title would be a great addition, as that’s definitely relevant to any employer visiting my portfolio. I also opted to lower the font size to 14px, to give me more room to work with. Where I differed however, was with the hierarchy. My rationale was that the title was now the most important piece of text (as opposed to price), followed by the company name as the second most relevant detail. I bolded the project title, and darkened the date to reflect this hierarchy.
      </p>
      <p>
        The final difference was the addition of a description area to the grid item. I felt this was particularly important, so that a brief summary could be shown about the project. This created an issue with hierarchy, however. Now, the description and date both shared the same visual weight (Figure 3). I really didn’t like this, as now at a glance the description and date appeared to combine and surround the title and company name. I decided to revert the color of the date, so that it shared the same visual weight of the company name. I found this to be better, since now the key details all appeared to fit into the same bucket.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Final design of grid item</>)}
      >
        <ImageViewer style={{height: '20em'}}>
          <Image src={GridItem3}></Image>
        </ImageViewer>
      </Caption>

      <h1>Main Page</h1>
      <p>
        The next step was to put the grid items together to get an idea of what the main page would look like. Initially I didn’t have any picture, or any footer. It was very plain and dull.
      </p>
      <p>
        The next step was to add an image and a footer to see how that would change the aesthetics (shown among Figure 8 images). I definitely liked this more, but it still wasn’t capturing my goal of elegance. I tried variations of the grid layout, which didn’t seem to improve the overall look of it. There was also a lot of text used, but this was fairly important to me. I didn’t want anyone to have to click on a project just to get an idea of what it was even about.
      </p>
      <p>
        I took a look at portfolio examples, and any grid system generally had very minimal amounts of text, or none at all. I decided to try and spread out the project in a scrollable list instead. I didn’t feel like this was as effective, but it was definitely more aesthetically pleasing. I decided I should focus more on aesthetics for the main page, as I definitely wanted a strong initial impression of my website. Even though I threw away the grid system, what I had learned was still retained, especially the hierarchy of the text.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Mockups of main menu</>)}
      >
        <ImageSlider style={{maxHeight: '60em'}}>
          <Image src={Main1}></Image>
          <Image src={Main2}></Image>
          <Image src={Main3}></Image>
        </ImageSlider>
      </Caption>
      <p>
        I hit a roadblock at this point, and I couldn’t quite figure out where to go from here. Fortunately, a friend gave me a lot of great feedback, and it pushed me towards better typography and design. Most notably, was the usage of colour, letter-spacing, and all-caps. I loved the suggestion of increasing the letter spacing on the main page sub-title (Front-End Web Developer), as well as using all caps with a darker font colour. I found that this change made it pop out more, and gave it more identity. Typography is by large my greatest design weakness, and so this kind of feedback was amazing to get.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Comparing typography in two examples</>)}
      >
        <ImageViewer>
          <Image src={TitleComparison}></Image>
        </ImageViewer>
      </Caption>
      <p>
        Along with these improvements, the main image of me was also removed. I really liked how this simplified the page, and I liked the aesthetic of it. It’s minimistic and straight to the point - this is my name, and this is what I do. It’s like the front of the business card.
      </p>
      <p>
        My original plans changed by a fair amount by this point, and it really made me realize how important external feedback was. Even a small suggestion as adding colour made a big difference. I wasn’t too sure what colour would make sense, but I always liked the idea of pink on black. I tried it out on the title (as shown in Figure 9), and it really helped ground the text onto the page. I tried other designs, using circles or attempting to change the text colour itself, but anything else felt far too visually heavy for my taste.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Usage of colour on main page</>)}
      >
        <ImageViewer>
          <Image src={Main4}></Image>
        </ImageViewer>
      </Caption>
      <p>
        At this point, I considered the main page to almost be done. The only parts of it that I wanted to explore more was adding some dynamic element to the landing page, and iterating on the footer some more. Since I used lines to ground and align text, I wanted to start with that as a concept to play with. My first idea was to start with a wavy line, with a glow behind it as if it was representing waves in the water, and I duplicated it and added a moon and ship to it. Afterwards, I tried creating an image with a line at the top and bottom of the screen. I played with the idea of planets, and finally I went even more abstract with lines moving at the center of the screen. There wasn’t any real logic to my decisions, and my goal was mostly just to gauge what looks aesthetically pleasing. However, since I was going for pure aesthetics, I felt like I had to stick to an abstract design so that it didn’t seem like I was trying to describe myself. If I had picked to use the image with the ship, I didn’t want visitors to think that I loved traveling, or that I was on trying to descibe myself as being on a journey through ever changing waves.
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
        I wanted to add some colour to the footer. I tested a variety of designs, but shifted my focus to creating a global footer instead. Deciding on a footer design that I liked was actually fairly challenging, but not for any particularly interesting reason. I always felt that something about it was off. I kept trying changes, looking at how other portfolios handle it, got feedback from a friend, which allowed me to iterate even further.
      </p>
      <p>
        I really wanted to have my email and my twitter as forms of contact. I see email as a traditional means of contact, whereas twitter seems to be a good means for informal messages. I see it as a sort of public text messaging for people, products, and companies. If someone has a question or comment, then twitter provides an informal means of contacting me.
      </p>
      <p>
        Initially I wanted to keep the icons accurate to their respective branding. Twitter especially was fairly strict in the usage of the twitter logo, which my usage of it fails to follow. As of this writing, I’m still on the fense on this decision. On one hand, sticking to their guidelines ensures that at a glance, the twitter logo can be instantly recognized. On the other hand, using an accurate logo makes it stand out like a sore thumb, and it  completely overpowers the other logos. I took a look at a variety of blogs and websites, and it seemed as though a fair amount made these sort of decisions as well.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Different designs for the footer</>)}
      >
        <ImageSlider>
          <Image src={Footer1}></Image>
          <Image src={Footer2}></Image>
          <Image src={Footer3}></Image>
          <Image src={Footer4}></Image>
        </ImageSlider>
      </Caption>
      <h1>Project Page</h1>
      <p>
        With the project page, I wanted a blog-style layout so that I could describe my process and my thoughts when creating new projects. However, I also wanted an overview page for each project inbetween the main page and the project blog. The blog-styled section of projects would have all my thoughts that I could think of, and so I really wanted an overview that could condense the main points down to a more typical length for a project page. For large projects, I knew I’d need a navigation list to allow quick navigation.
      </p>
      <p>
        I went through a few iterations for the tree list. Initially, I had the idea of having a background, and highlighting the selected item with a darker background. I didn’t quite like how it looked, so I added some padding to the selected item, and soon after I even played around with the idea of having a back button above the list. I still didn’t like it, because it just felt so visually heavy. I wanted a more subtle style. I played with the colours, but it wasn’t until I removed the background until I felt like I was onto something. For selected items, I kept the additional padding, but I also bolded the text. I darkened the text for non-selected items as well. I really liked this change, and it gave me the minimal look that I was aiming for. It was still clear what item was selected, without using anything that would make the visual weight of the list too heavy.
      </p>
      <p>
        The next step was to figure out how this list could be made into a tree list with sub-items. This ended up being fairly simple, but I found that I needed to use a thin line to divide the list between the parent and child. Without it, it felt like the child list was just floating around. This definitely stayed consistent with the line usage on the main page.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Different designs for the navigation list</>)}
      >
        <ImageSlider>
          <Image src={TreeList1}></Image>
          <Image src={TreeList2}></Image>
          <Image src={TreeList3}></Image>
        </ImageSlider>
      </Caption>
      <p>
        The final step was to mockup the overview and blog-styled page. This wasn’t much work at all, as the overview simply just followed the style of the main page. With the blog-style, I found the contrast to be too large between the text and dark grey background due to the amount of text on screen. I added a lighter grey background behind the text to diminish potential eye strain, as well as to better ground the text onto the page.
      </p>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Overview page</>)}
      >
        <ImageViewer>
          <Image src={Overview}></Image>
        </ImageViewer>
      </Caption>
      <Caption
        caption={(<><i>{`Figure ${captionNum += 1}.`}</i> Blog-style page</>)}
      >
        <ImageViewer>
          <Image src={BlogStyle}></Image>
        </ImageViewer>
      </Caption>
    </div>
  );
}
