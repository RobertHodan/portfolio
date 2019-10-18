import React from 'react';
import { createMapFromLabels } from '../../utils/utils';
import { List } from '../../components/list/list';
import { ListItemProps } from '../../components/list-item/list-item';
import './header.scss';

export function Header() {
  const [map, order] = createMapFromLabels(['Works', 'About', 'Contact', 'Resume']);
  const item = (props: ListItemProps) => {
    return (
      <a>
        {props.label}
      </a>
    )
  }

  return (
    <header className={'header'}>
      <div className={'spacing-div'}></div>
      <h1>Robert Hodan</h1>
      <List
        list={ map }
        listOrder={ order }
        itemChildren={ item }
        className={ 'header-nav' }
        selectedId={ order[0] }
      ></List>
    </header>
  );
}