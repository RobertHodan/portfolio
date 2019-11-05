import React, { useMemo, useState } from 'react';
import { createMapFromList, getNextUniqueId } from '../../utils/utils';
import './header.scss';
import { Link, useHistory } from 'react-router-dom';
import { NavList, NavListMap } from '../../components/nav-list/nav-list';
import { HamburgerMenu } from '../../components/hamburger-menu/hamburger-menu';
import { getRouteByPath, RouteDetails, getRouteNavListDataByRootPath } from '../../components/hamburger-menu/routes';
import { Button } from '../../components/button/button';
import { NavTreeList, NavTreeListMap } from '../../components/nav-tree-list.tsx/nav-tree-list';

export function Header() {
  const history = useHistory();

  const data = [
    {
      id: getNextUniqueId(),
      label: 'Works',
      path: '/',
    }, {
      id: getNextUniqueId(),
      label: 'About',
      path: '/about',
    }, {
      id: getNextUniqueId(),
      label: 'Contact',
      path: '/contact',
    },
    {
      id: getNextUniqueId(),
      label: 'Resume',
      path: '/resume',
    }
  ];

  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(true);

  const [map, order] = useMemo(() => {
    return createMapFromList(data) as [NavListMap, string[]]
  }, [data]);

  const projectNav = useMemo(() => {
    const rootPath = `/${history.location.pathname.split('/')[1]}`;
    const [map, order] = getRouteNavListDataByRootPath(rootPath);
    if (!order.length) {
      return;
    }

    return (
      <NavTreeList
        listMap={ map }
        rootIds={ order }
        className={ 'project-nav' }
        selectedId={ history.location.pathname }
      ></NavTreeList>
    )
  }, [history.location.pathname])

  return (
    <header className={'header'}>
      <div className={'spacing-div'}>
        <HamburgerMenu
          isMenuOpen={false}
          key={history.location.pathname}
        >
          { createNavList(map, order, projectNav, isProjectMenuOpen, setIsProjectMenuOpen) }
        </HamburgerMenu>
      </div>
      <Link to={'/'}>
        <h1>Robert Hodan</h1>
      </Link>
      <div className={'spacing-div'}>
        <NavList
          listMap={ map }
          listOrder={ order }
          className={ 'header-nav' }
        ></NavList>
      </div>
    </header>
  );
}

const createNavList = (
  map: NavListMap,
  order: string[],
  projectNav: React.ReactNode,
  isProjectMenuOpen: boolean,
  setIsProjectMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (projectNav) {
    const handleMainClick = () => {
      setIsProjectMenuOpen(false);
    }
    const handleProjectClick = () => {
      setIsProjectMenuOpen(true);
    }

    // Turn this into a component if there's time
    let contents;
    if (isProjectMenuOpen) {
      contents = projectNav;
    } else {
      contents = (
        <NavList
          listMap={ map }
          listOrder={ order }
          className={ 'ham-nav' }
        ></NavList>
      );
    }

    return (
      <>
        <nav className="nav-switch">
          <ul>
            <li className={`list-item${isProjectMenuOpen ? '' : ' selected'}`}>
              <Button onClick={handleMainClick}>
                Main
              </Button>
            </li>
            <li className={`list-item${isProjectMenuOpen ? ' selected' : ''}`}>
              <Button onClick={handleProjectClick}>
                Project
              </Button>
            </li>
          </ul>
        </nav>
        { contents }
      </>
    )
  }

  return (
    <NavList
      listMap={ map }
      listOrder={ order }
      className={ 'ham-nav' }
    ></NavList>
  );
}
