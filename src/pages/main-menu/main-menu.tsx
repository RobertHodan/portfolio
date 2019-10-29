import React from 'react';
import './main-menu.scss';
import { ProjectItem } from '../../components/project-item/project-item';

export function MainMenu() {
  return (
    <div className={'main-menu'}>
      <div className={'landing-screen'}>
        <div className={'title'}>
          <h1>Robert Hodan</h1>
          <h2>Front-End Web Developer</h2>
        </div>
      </div>
      <ProjectItem
        title={'Lorem ipsum dolor sit amet'}
        companyName={'Deserunt Mollit'}
        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec urna ultricies, semper purus at, ullamcorper ipsum. Nam dui enim, lacinia eget vestibulum et, facilisis sed leo. Morbi in euismod enim, ac elementum turpis. Integer lacus elit, pulvinar auctor ex quis, vulputate bibendum turpis. Aenean suscipit urna ac leo tristique, eget porttitor neque mollis. Proin vel auctor metus. Fusce augue tortor, bibendum vel tortor ac, varius hendrerit felis.'}
        page={'/portfolio-project'}
      ></ProjectItem>
      <ProjectItem
        title={'Lorem ipsum dolor sit amet'}
        companyName={'Deserunt Mollit'}
        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec urna ultricies, semper purus at, ullamcorper ipsum. Nam dui enim, lacinia eget vestibulum et, facilisis sed leo. Morbi in euismod enim, ac elementum turpis. Integer lacus elit, pulvinar auctor ex quis, vulputate bibendum turpis. Aenean suscipit urna ac leo tristique, eget porttitor neque mollis. Proin vel auctor metus. Fusce augue tortor, bibendum vel tortor ac, varius hendrerit felis.'}
      ></ProjectItem>
      <ProjectItem
        title={'Lorem ipsum dolor sit amet'}
        companyName={'Deserunt Mollit'}
        description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec urna ultricies, semper purus at, ullamcorper ipsum. Nam dui enim, lacinia eget vestibulum et, facilisis sed leo. Morbi in euismod enim, ac elementum turpis. Integer lacus elit, pulvinar auctor ex quis, vulputate bibendum turpis. Aenean suscipit urna ac leo tristique, eget porttitor neque mollis. Proin vel auctor metus. Fusce augue tortor, bibendum vel tortor ac, varius hendrerit felis.'}
      ></ProjectItem>
    </div>
  );
}