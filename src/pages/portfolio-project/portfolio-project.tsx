import React from 'react';
import { getNextUniqueId, createMapFromList } from '../../utils/utils';
import { useRouteMatch } from 'react-router';
import { NavTreeList, NavTreeListMap } from '../../components/nav-tree-list.tsx/nav-tree-list';
import { HamburgerMenu } from '../../components/hamburger-menu/hamburger-menu';
// import './header.scss';

export function PortfolioProject() {
  let currentRoute = useRouteMatch() || {path: ''};
  const data = [
    {
      id: getNextUniqueId(),
      label: 'Overview',
      path: `${currentRoute.path}/`,
    },
    {
      id: getNextUniqueId(),
      label: 'Mockup Phase',
      path: `${currentRoute.path}/`,
      subItems: [{
        id: getNextUniqueId(),
        label: 'Mockup',
        path: `${currentRoute.path}/`,
      }, {
        id: getNextUniqueId(),
        label: 'Wireframes',
        path: `${currentRoute.path}/`,
      }, {
        id: getNextUniqueId(),
        label: 'Grid View',
        path: `${currentRoute.path}/`,
      }, {
        id: getNextUniqueId(),
        label: 'Main Page',
        path: `${currentRoute.path}/`,
      }, {
        id: getNextUniqueId(),
        label: 'Project Page',
        path: `${currentRoute.path}/`,
      }]
    }, {
      id: getNextUniqueId(),
      label: 'Development',
      path: `${currentRoute.path}/`,
      subItems: [{
        id: getNextUniqueId(),
        label: 'Why SCSS',
        path: `${currentRoute.path}/`,
      }, {
        id: getNextUniqueId(),
        label: 'Why Typescript',
        path: `${currentRoute.path}/`,
      }, {
        id: getNextUniqueId(),
        label: 'Why React',
        path: `${currentRoute.path}/`,
      }, {
        id: getNextUniqueId(),
        label: 'TreeList',
        path: `${currentRoute.path}/`,
      }]
    },
    {
      id: getNextUniqueId(),
      label: 'Conclusion',
      path: `${currentRoute.path}/`,
    }
  ];

  const [map, order] = createMapFromList(data, true) as [NavTreeListMap, string[]];

  return (
    <div>

    </div>
  );
}
