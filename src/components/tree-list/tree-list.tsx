import React from 'react';
import { ListItemProps, ListItem } from '../list-item/list-item';
import './tree-list.scss';
import { TreeListMap } from '../tree-list-controller/tree-list-controller';

export interface TreeListItemProps extends ListItemProps {
  id: string,
}

export type TreeListProps = {
  listMap: TreeListMap,
  listOrder: string[],
  className?: string,
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void,
  onItemSelect?: (id: string) => void,
  onItemClick?: (id: string) => void,
  role?: string,
};

export class TreeList extends React.Component<TreeListProps> {

  render() {
    return (
      <ul
        className={ this.props.className || 'tree-list' }
        onKeyDown={ this.props.onKeyDown }
        role={ this.props.role || 'tree' }
      >
        {this.createItems(this.props.listOrder)}
      </ul>
    );
  }

  createItems(listIds: string[]): JSX.Element[] {
    return listIds.map(((id: string) => {
      const item = this.props.listMap[id];

      return <ListItem
        listMap={ this.props.listMap }
        subItemIds={ item.childIds }
        key={ item.id }
        onSelect={ this.props.onItemSelect }
        onClick={ this.props.onItemClick }
        {...item}
      />
    }
    ));
  }
}