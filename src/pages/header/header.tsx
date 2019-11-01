import React, { useMemo } from 'react';
import { createMapFromList, getNextUniqueId } from '../../utils/utils';
import './header.scss';
import { Link, useHistory } from 'react-router-dom';
import { NavList, NavListMap } from '../../components/nav-list/nav-list';
import { HamburgerMenu } from '../../components/hamburger-menu/hamburger-menu';

export function Header() {
  // const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

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

  console.log(history.location.pathname);

  const [map, order] = useMemo(() => {
    return createMapFromList(data) as [NavListMap, string[]]
  }, data);


  return (
    <header className={'header'}>
      <div className={'spacing-div'}>
        <HamburgerMenu
          isMenuOpen={false}
          key={history.location.pathname}
        >
          <NavList
            listMap={ map }
            listOrder={ order }
            className={ 'ham-nav' }
          ></NavList>
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

