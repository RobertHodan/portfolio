import React from 'react';
import { ListProps, ListMapItem, List, ListMap } from "../list/list";
import { Link } from 'react-router-dom';
import { ListItem } from '../list-item/list-item';

export type NavListMapItem = {
  path: string,
} & ListMapItem;

export type NavListMap = {
  [id: string]: NavListMapItem,
}

export type NavListProps = {
  listMap: NavListMap,
} & Omit<ListProps, 'listMap'>;

type navListItemCallback = <NavListMapItem> (props: NavListMapItem) => React.ReactNode;

export class NavList extends React.Component<NavListProps> {
  render() {
    return (
      <nav>
        <List
          functionItemContent={ this.createItemContent as navListItemCallback}
          {...this.props}
        ></List>
      </nav>
    );
  }

  createItemContent = (props: NavListMapItem): React.ReactNode => {
    const {path, ...item} = props;

    return (
      <Link to={path}>
        {item.label}
      </Link>
    );
  }
}

