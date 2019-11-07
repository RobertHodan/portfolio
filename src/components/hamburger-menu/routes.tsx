import React, { Component } from 'react';
import { MainMenu } from '../../pages/main-menu/main-menu';
import { PortfolioProject } from '../../pages/portfolio-project/portfolio-project';
import { getNextUniqueId } from '../../utils/utils';
import { Route } from 'react-router';
import { NavTreeListMap, NavTreeListMapItem } from '../nav-tree-list.tsx/nav-tree-list';
import { MockupPhase } from '../../pages/portfolio-project/mockup-phase';

export type RouteDetails = {
  childPaths: string[],
  parentPath: string,
  rootParentPath: string,
} & RouteCoreDetails;

type RouteCoreDetails = {
  path: string,
  component?: () => JSX.Element,
}

type RouteMap = {
  [id: string]: RouteDetails,
};

// Assumed to be in the order of how the items are nested
// Eg. a parent comes first, and it's children are immediately below it
const routes: RouteCoreDetails[] = [{
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
  component: MockupPhase, //PortfolioProject,
}
// , {
//   path: '/portfolio-project/overview',
// }
, {
  path: '/portfolio-project/mockup-phase',
  component: MockupPhase,
}, {
  path: '/portfolio-project/mockup-phase#mockup',
}, {
  path: '/portfolio-project/mockup-phase#wireframes',
}, {
  path: '/portfolio-project/mockup-phase#grid-view',
}, {
  path: '/portfolio-project/mockup-phase#main-page',
}, {
  path: '/portfolio-project/mockup-phase#project-page',
}, {
  path: '/portfolio-project/development-phase',
}, {
  path: '/portfolio-project/development-phase/development',
}, {
  path: '/portfolio-project/development-phase/development/why-scss',
}, {
  path: '/portfolio-project/development-phase/development/why-typescript',
}, {
  path: '/portfolio-project/development-phase/development/why-react',
}, {
  path: '/portfolio-project/development-phase/tree-list',
}, {
  path: '/portfolio-project/conclusion',
}];

let routeTreeListMap: { [id: string]: [NavTreeListMap, string[]] } = {};
function createRouteTreeListMap() {
  let rootParentId = '';
  let rootProjectId = '';
  for (const route of routes) {
    // Is item a root item
    if (route.path.split(/[\/,#]+/).length === 2) {
      rootParentId = route.path;
    }
    if (route.path.split(/[\/,#]+/).length === 3) {
      rootProjectId = route.path;
    }
    const data = routeTreeListMap[rootParentId] || [{}, []];

    const lastIndex = route.path.lastIndexOf('#') !== -1 ? route.path.lastIndexOf('#') : route.path.lastIndexOf('/');
    const parentPath = route.path.substr(0, lastIndex);
    const parent = data[0][parentPath];
    let routeSegments = route.path.split(/[\/,#]+/);
    let routeLabel = routeSegments[routeSegments.length-1];
    routeLabel = routeLabel.replace('-', ' ');
    const current: NavTreeListMapItem = {
      id: route.path,
      childIds: [],
      rootParentId: rootProjectId,
      label: routeLabel,
      collapsed: true,
      ...route,
    };

    if (parent) {
      parent.childIds.push(route.path);
      current.parentId = parent.id;

      if (parent.path === rootParentId) {
        data[1].push(current.id);
      }
    }


    data[0][route.path] = current;
    routeTreeListMap[rootParentId] = data;
  }
}
createRouteTreeListMap();

function createRouteByPath() {
  const map: RouteMap = {};
  for (const route of routes) {
    const lastIndex = route.path.lastIndexOf('#') !== -1 ? route.path.lastIndexOf('#') : route.path.lastIndexOf('/');
    const parentPath = route.path.substr(0, lastIndex);
    const parent = map[parentPath];
    const current: RouteDetails = {
      childPaths: [],
      parentPath: '',
      rootParentPath: '',
      ...route,
    };

    if (parent) {
      parent.childPaths.push(route.path);
      current.parentPath = parent.path;
    }

    map[route.path] = current;
  }

  return map;
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

export function getRouteByPath(path: string): RouteDetails {
  return routeByPath[path];
}

export function getRouteNavListDataByRootPath(path: string): [NavTreeListMap, string[]] {
  return routeTreeListMap[path];
}
