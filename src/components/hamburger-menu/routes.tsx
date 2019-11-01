import React, { Component } from 'react';
import { MainMenu } from '../../pages/main-menu/main-menu';
import { PortfolioProject } from '../../pages/portfolio-project/portfolio-project';
import { getNextUniqueId } from '../../utils/utils';
import { Route } from 'react-router';

type RouteDetails = {
  path: string,
  component?: () => JSX.Element,
}

type RouteMap = {
  childPaths: string[],
} & RouteDetails;

// Assumed to be in the order of how the items are nested
// Eg. a parent comes first, and it's children are immediately below it
const routes: RouteDetails[] = [{
  path: '/',
  component: MainMenu,
}, {
  path: '/about',
}, {
  path: '/contact',
}, {
  path: '/resume',
}, {
  path: '/portfolio-project',
  component: PortfolioProject,
}, {
  path: '/portfolio-project/overview',
}, {
  path: '/portfolio-project/mockup-phase',
}, {
  path: './portfolio-project/mockup',
}, {
  path: './portfolio-project/mockup/wireframes',
}, {
  path: './portfolio-project/mockup/grid-view',
}, {
  path: './portfolio-project/mockup/main-page',
}, {
  path: './portfolio-project/mockup/project-page',
}, {
  path: './portfolio-project/development-phase',
}, {
  path: './portfolio-project/development-phase/development',
}, {
  path: './portfolio-project/development-phase/development/why-scss',
}, {
  path: './portfolio-project/development-phase/development/why-typescript',
}, {
  path: './portfolio-project/development-phase/development/why-react',
}, {
  path: './portfolio-project/development-phase/tree-list',
}, {
  path: './portfolio-project/conclusion',
}];

function createRouteByPath() {
  const map = {};
  for (const route of routes) {
    const segments = route.path.split('/').filter((seg) => seg.length);
  }
}
const routeByPath = createRouteByPath();


const routeComponents = routes.filter((route) => {
  return route.component;
}).map((route) => {
  const id = getNextUniqueId();
  return <Route exact path={route.path} component={route.component} key={id}></Route>;
});

export function getRouteComponents(): JSX.Element[] {
  return routeComponents;
};

