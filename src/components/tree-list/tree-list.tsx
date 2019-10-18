import React from 'react';
import { ListItemProps, ListItem } from '../list-item/list-item';
import './tree-list.scss';
import { TreeListMap, TreeListMapItem } from '../tree-list-controller/tree-list-controller';
import { ListMap, List } from '../list/list';
import { CollapsibleItem } from '../collapsible-item/collapsible-item';

export interface TreeListItemProps extends ListItemProps {
  id: string,
}

export type TreeListProps = {
  listMap: TreeListMap,
  listOrder: string[],
  className?: string,
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void,
  onLabelClick?: (props: TreeListItemProps, event: React.MouseEvent) => void,
  onItemClick?: (props: TreeListItemProps, event: React.MouseEvent) => void,
  role?: string,
  functionItem?: (props: ListItemProps) => JSX.Element,
};

export class TreeList extends React.Component<TreeListProps> {
  static defaultProps: {
    role: 'tree',
  }

  listItemFunction = (props: ListItemProps) => {
    const { listMap, listOrder, onLabelClick, onItemClick } = this.props;
    const item = listMap[props.id];

    return (
      <ListItem
        key={ item.id }
        role={ 'treeitem' }
        tabIndex={ item.focused ? 0 : -1 }
        ariaExpanded={ listOrder.length ? !item.collapsed : undefined }
        {...item}
      >
        <CollapsibleItem
          listMap={ listMap }
          childIds={ item.childIds }
          onLabelClick={ onLabelClick }
          onItemClick={ onItemClick }
          {...props}
        >
        </CollapsibleItem>
      </ListItem>
    )
  }

  render() {
    return (
      <List
        functionItem={ this.listItemFunction }
        className={ 'tree-list' }
        {...this.props}
      ></List>
    );
  }
}