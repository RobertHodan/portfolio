import React from 'react';
import { Link } from 'react-router-dom';
import { TreeListController, TreeListMapItem, TreeListControllerProps } from '../tree-list-controller/tree-list-controller';

export type NavTreeListMapItem = {
  path: string,
} & TreeListMapItem;

export type NavTreeListMap = {
  [id: string]: NavTreeListMapItem,
}

export type NavTreeListProps = {
  listMap: NavTreeListMap,
  rootIds: string[],
} & Omit<Omit<TreeListControllerProps, 'listMap'>, 'listOrder'>;

type navListItemCallback = <NavListMapItem> (props: NavListMapItem) => React.ReactNode;

export class NavTreeList extends React.Component<NavTreeListProps> {
  render() {
    const {rootIds, listMap, ...props} = this.props;

    return (
      <nav className={this.props.className || ''}>
        <TreeListController
          functionItemContent={ this.createItemContent as navListItemCallback}
          rootIds={ rootIds }
          listMap={ listMap }
          selectedId={ this.props.selectedId }
        ></TreeListController>
      </nav>
    );
  }

  createItemContent = (props: NavTreeListMapItem): React.ReactNode => {
    const {path, ...item} = props;

    return (
      <Link to={path}>
        {item.label}
      </Link>
    );
  }
}

