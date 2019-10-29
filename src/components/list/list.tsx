import React from 'react';
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

type ListItemCallback = (props: ListMapItem) => React.ReactNode;
type GenericCallback = <T>(props: ListMapItem & T) => React.ReactNode;

export type ListProps = {
  listMap: ListMap,
  listOrder: string[],
  className?: string,
  onItemClick?: (props: ListItemProps, event: React.MouseEvent) => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void,
  role?: string,
  functionItem?: GenericCallback | ListItemCallback,
  functionItemContent?: GenericCallback | ListItemCallback,
  selectedId?: string,
};

export class List extends React.Component<ListProps> {
  allSelectedIds: string[] = [];

  render() {
    const { listMap, className, onKeyDown, role } = this.props;
    console.log('rendered');
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
    const { listMap, onItemClick, functionItem, functionItemContent, listOrder } = this.props;
    return listOrder.map(((id: string) => {
      const item = listMap[id];

      if (functionItem) {
        return functionItem(item);
      }

      return <ListItem
        key={ item.id }
        onClick={ onItemClick }
        functionItem={ functionItemContent }
        {...item}
      >
      </ListItem>
    }
    ));
  }
}
