import React from 'react';
import { ListItemProps, ListItem } from '../list-item/list-item';
import './tree-list.scss';
import { TreeListOrder, TreeListMap } from '../tree-list-controller/tree-list-controller';

export interface TreeListItemProps extends ListItemProps {
  id: string,
}

export type TreeListProps = {
  listMap: TreeListMap,
  listOrder: TreeListOrder[],
  className?: string,
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void,
};

export class TreeList extends React.Component<TreeListProps> {

  render() {
    return (
      <ul
        className={ this.props.className || 'tree-list' }
        onKeyDown={ this.props.onKeyDown }
      >
        {this.createItems(this.props.listOrder)}
      </ul>
    );
  }

  createItems(list: TreeListOrder[]): JSX.Element[] {
    return list.map(((orderItem: TreeListOrder) => {
      const item = this.props.listMap[orderItem.id];

      return <ListItem
        listMap={this.props.listMap}
        subItems={orderItem.subItems}
        key={item.id}
        {...item}
      />
    }
    ));
  }
}