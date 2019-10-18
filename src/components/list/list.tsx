import React from 'react';
import { TreeList } from '../tree-list/tree-list';
import { ListItemProps, ListItem } from '../list-item/list-item';

export type ListMapItem = {
  id: string,
  label?: string,
  selected?: boolean,
  collapsed?: boolean,
  focused?: boolean,
}

export type ListMap = {
  [id: string]: ListMapItem,
}

export type ListProps = {
  listMap: ListMap,
  listOrder: string[],
  className?: string,
  onItemClick?: (props: ListItemProps, event: React.MouseEvent) => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void,
  role?: string,
  functionItem?: (props: ListItemProps) => React.ReactNode,
  selectedId?: string,
};

export class List extends React.Component<ListProps> {
  allSelectedIds: string[];

  constructor(props: ListProps) {
    super(props);

    this.allSelectedIds = [];
  }

  render() {
    const { listMap, className, onKeyDown, role } = this.props;
    // Reset all selections
    for (const id of this.allSelectedIds) {
      listMap[id].selected = false;
    }

    if (this.props.selectedId) {
      listMap[this.props.selectedId].selected = true;
      this.allSelectedIds.push(this.props.selectedId);
    }

    return (
      <ul
        className={ className || 'list' }
        onKeyDown={ onKeyDown }
        role={ role }
      >
        {this.createItems()}
      </ul>
    );
  }

  createItems(): React.ReactNode {
    const { listMap, onItemClick, functionItem, listOrder } = this.props;
    return listOrder.map(((id: string) => {
      const item = listMap[id];

      if (functionItem) {
        return functionItem(item);
      }

      return <ListItem
        key={ item.id }
        onClick={ onItemClick }
        {...item}
      >
      </ListItem>
    }
    ));
  }
}
