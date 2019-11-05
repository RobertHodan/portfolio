import React from 'react';
import { ListProps, ListMapItem, List } from "../list/list";
import { Link } from 'react-router-dom';

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
    const {className, ...props} = this.props;

    return (
      <nav className={className}>
        <List
          functionItemContent={ this.createItemContent as navListItemCallback}
          {...props}
        ></List>
      </nav>
    );
  }

  createItemContent = (props: NavListMapItem): React.ReactNode => {
    const {path, ...item} = props;

    return (
      <Link to={path}>
        <span>{item.label}</span>
      </Link>
    );
  }
}

