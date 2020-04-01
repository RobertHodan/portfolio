import React, { useEffect } from 'react';
import './main-menu.scss';
import { ProjectItem } from '../../components/project-item/project-item';
import PortfolioTile from './imgs/portfolio-tile.png';
import HighlighterTile from './imgs/highlighter-tile.png';
import TreeDropdownListTile from './imgs/tree-dropdown-tile.png';
import { startLineCanvas } from '../title-card/title-card';

export function MainMenu() {
  useEffect(() => {
    const canvas = document.getElementById('title-card') as HTMLCanvasElement;
    const stopLineCanvas = startLineCanvas(canvas);

    return stopLineCanvas;
  }, []);

  return (
    <div className={'main-menu'}>
      <div className={'landing-screen'}>
        <canvas id='title-card'></canvas>
        <div className={'title'}>
          <h1>Robert Hodan</h1>
          <h2>Front-End Web Developer</h2>
        </div>
      </div>
      <div id="works">
        {/* <ProjectItem
          title={'Creating a Portfolio Website'}
          companyName={'Personal Project'}
          description={'Created a website to showcase past projects. Built using React, and aimed for a minimal dark theme. This project also involved the creation of components for displaying lists and tree lists, as well as components for displaying and navigating through images. Basic keyboard navigation being a key focus for these features.'}
          page={'/portfolio-project/overview'}
          imageSrc={PortfolioTile}
        ></ProjectItem> */}
        <ProjectItem
          title={'Adding text highlighting support'}
          companyName={'Evident Point'}
          companyLink={'https://evidentpoint.com/'}
          description={'Added support for text highlighting to an EPUB reader. This involved using a next generation version of Readium - a library for displaying and navigating through EPUB books.'}
          imageSrc={HighlighterTile}
          page={'/text-highlighting'}
        ></ProjectItem>
        <ProjectItem
          title={'Creating a Tree Dropdown List'}
          companyName={'Evident Point'}
          companyLink={'https://evidentpoint.com/'}
          description={'Added support for tree dropdown lists - lists that can have child items, and be expanded or collapsed. Created for ActiveTextbook.'}
          imageSrc={TreeDropdownListTile}
          page={'/tree-dropdown-list'}
        ></ProjectItem>
        {/*
        <ProjectItem
          title={'Lorem ipsum dolor sit amet'}
          companyName={'Deserunt Mollit'}
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec urna ultricies, semper purus at, ullamcorper ipsum. Nam dui enim, lacinia eget vestibulum et, facilisis sed leo. Morbi in euismod enim, ac elementum turpis. Integer lacus elit, pulvinar auctor ex quis, vulputate bibendum turpis. Aenean suscipit urna ac leo tristique, eget porttitor neque mollis. Proin vel auctor metus. Fusce augue tortor, bibendum vel tortor ac, varius hendrerit felis.'}
        ></ProjectItem> */}
      </div>
    </div>
  );
}