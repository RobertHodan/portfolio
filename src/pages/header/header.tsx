import React from 'react';
import { createMapFromLabels, createMapFromList, getNextUniqueId } from '../../utils/utils';
import { List } from '../../components/list/list';
import { ListItemProps } from '../../components/list-item/list-item';
import './header.scss';
import { Link } from 'react-router-dom';
import { NavList, NavListProps, NavListMap } from '../../components/nav-list/nav-list';

export function Header() {
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

  const [map, order] = createMapFromList(data) as [NavListMap, string[]];

  return (
    <header className={'header'}>
      <div className={'spacing-div'}></div>
      <Link to={'/'}>
        <h1>Robert Hodan</h1>
      </Link>
      <NavList
        listMap={ map }
        listOrder={ order }
        className={ 'header-nav' }
      ></NavList>
    </header>
  );
}