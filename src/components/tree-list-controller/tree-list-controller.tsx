import React from 'react';
import update from 'immutability-helper';
import { TreeListItemProps, TreeListProps, TreeList } from '../tree-list/tree-list';

export type TreeListItem = {
  id: string,
  label: string,
  subItems: TreeListItem[],
}

export interface TreeListControllerProps extends TreeListProps {
  list: TreeListItem[],
  // if an item is selected, but it belongs to a collapsed parent, then show that parent as selected instead
  selectParentIfCollapsed: boolean,
  // If the end of the list is reached, roll over to the other side
  rollover: boolean,
};

export interface TreeListControllerState {
  listOrder: TreeListOrder[],
  listMap: TreeListMap,
}

export type TreeListMapItem = {
  id: string,
  label: string,
  parentId?: string,
  childIds: string[],
  selected?: boolean,
  collapsed?: boolean,
  focused?: boolean,
}

export type TreeListMap = {
  [id: string]: TreeListMapItem,
}

export type TreeListOrder = {
  id: string,
  subItems: TreeListOrder[],
}

export enum TreeListControllerEventNames {
  PrevItem,
  NextItem,
  StepOut,
  StepIn,
  ToggleItem,
  FirstItem,
  LastItem,
}

export class TreeListController extends React.Component<TreeListControllerProps, TreeListControllerState> {
  eventBindings: {
    [key: number]: string[],
  }

  focusedId?: string

  constructor(props: TreeListControllerProps) {
    super(props);
    let [list, order] = this.flattenList(props.list) as [TreeListMap, TreeListOrder[]];

    // DEBUGGING
    window.TreeList = this;

    // Ensure that the first item starts off focused, so that it can be tabbed to via keyboard
    list = update(list, {
      [order[0].id]: {
        $merge: {
          focused: true,
        },
      },
    });

    this.state = {
      listOrder: order,
      listMap: list,
    };

    const e = TreeListControllerEventNames;
    this.eventBindings = {
      [e.PrevItem]: ['ArrowUp'],
      [e.NextItem]: ['ArrowDown'],
      [e.StepOut]: ['ArrowLeft'],
      [e.StepIn]: ['ArrowRight'],
      [e.ToggleItem]: [' ', 'Enter'],
      [e.FirstItem]: ['Home'],
      [e.LastItem]: ['End'],
    };
  }

  handleOnKeyDown = (event: React.KeyboardEvent) => {
    const eventName = this.getFirstEventName(event.key);
    if (typeof(eventName) === 'number') {
      this.handleEvent(eventName);
    }
  }

  render() {
    const {listOrder, listMap} = this.state;

    return (
      <TreeList
        listMap={ listMap }
        listOrder={ listOrder }
        onKeyDown={ this.handleOnKeyDown }
      />
    );
  }

  // Assumes no two events will share the same key
  getFirstEventName(key: string): number | undefined {
    const keys = Object.keys(this.eventBindings).map((key) => parseInt(key));
    return keys.find((action) => {
      return this.eventBindings[action].includes(key);
    });
  }

  handleEvent(eventName: number) {
    const eventNames = TreeListControllerEventNames;
    switch(eventName) {
      case eventNames.PrevItem:
        this.focusPreviousItem();
        break;
      case eventNames.NextItem:
        this.focusNextItem();
        break;
      case eventNames.StepOut:
        this.stepOutOrCollapse();
        break;
      case eventNames.StepIn:
        this.stepIntoOrExpand();
        break;
      case eventNames.ToggleItem:
        break;
      case eventNames.FirstItem:
        break;
      case eventNames.LastItem:
        break;
    }
  }

  stepIntoOrExpand() {
    const focusedItem = this.getFocusedItem();
    if (focusedItem.collapsed) {
      this.collapseItem(focusedItem, false);
    } else {
      this.stepIntoItem(focusedItem);
    }
  }

  stepOutOrCollapse() {
    const focusedItem = this.getFocusedItem();
    if (!focusedItem.collapsed) {
      this.collapseItem(focusedItem, true);
    } else {
      this.stepOutItem(focusedItem);
    }
  }

  stepIntoItem(item: TreeListMapItem) {
    if (item.childIds.length === 0) {
      return;
    }

    const firstChild = this.getChildItemByIndex(item, 0);
    if (firstChild) {
      this.focusItem(firstChild);
    }
  }

  stepOutItem(item: TreeListMapItem) {
    if (!item.parentId) {
      return;
    }

    const parent = this.state.listMap[item.parentId];
    if (parent) {
      this.focusItem(parent);
    }
  }

  collapseItem(item: TreeListMapItem, state: boolean) {
    const newListMap = update(this.state.listMap, {
      [item.id]: {
        $merge: {
          collapsed: state,
        },
      },
    });

    this.setState({
      listMap: newListMap,
    });
  }

  focusNextItem() {
    const focusedItem = this.getFocusedItem();
    const nextItem = this.getNextItem(focusedItem);
    if (!nextItem) {
      return;
    }

    this.focusItem(nextItem, focusedItem);
  }

  focusPreviousItem() {
    const focusedItem = this.getFocusedItem();
    const prevItem = this.getPreviousItem(focusedItem);
    if (!prevItem) {
      return;
    }

    this.focusItem(prevItem, focusedItem);
  }

  focusItem(newItem: TreeListMapItem, prevItem: TreeListMapItem = this.getFocusedItem()) {
    const newListMap = update(this.state.listMap, {
      [prevItem.id]: {
        $merge: {
          focused: false,
        },
      },
      [newItem.id]: {
        $merge: {
          focused: true,
        },
      },
    });

    this.focusedId = newItem.id;
    this.setState({
      listMap: newListMap
    });
  }

  getChildItemByIndex(item: TreeListMapItem, index: number): TreeListMapItem | undefined {
    return this.getChildItemByIndexRecursive(item, index);
  }

  getChildItemByIndexRecursive(
    item: TreeListMapItem,
    index: number,
    orderItems: TreeListOrder[] = this.state.listOrder,
  ): TreeListMapItem | undefined {
    let child;
    for (let i=0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      const itemDetails = this.state.listMap[orderItem.id];
      if (itemDetails.parentId === item.id && i === index) {
        child = itemDetails;
        break;
      }

      if (orderItem.subItems.length) {
        const returnedChild = this.getChildItemByIndexRecursive(item, index, orderItem.subItems);
        if (returnedChild) {
          child = returnedChild;
          break;
        }
      }
    }

    return child;
  }

  getFocusedItem(): TreeListMapItem {
    const map = this.state.listMap;
    const id = this.focusedId;
    const firstId = this.state.listOrder[0].id;

    // Return the focused item, or default to the first item if there's no focus currently
    return id ? (map[id] || map[firstId]) : map[firstId];
  }

  getNextItem(item: TreeListMapItem): TreeListMapItem | undefined {
    return this.getNextItemRecursive(item);
  }

  getNextItemRecursive(
    item: TreeListMapItem,
    orderItems: TreeListOrder[] = this.state.listOrder,
    targetItem: { wasFound: boolean } = { wasFound: false },
    recursiveCount: number = 0,
  ): TreeListMapItem | undefined {
    let nextItem;
    for (const orderItem of orderItems) {
      if (nextItem) {
        break;
      }
      const currentItem = this.state.listMap[orderItem.id];
      if (targetItem.wasFound) {
        nextItem = currentItem;
        break;
      }
      if (orderItem.id === item.id) {
        targetItem.wasFound = true;
      }
      if (orderItem.subItems.length && !nextItem && !currentItem.collapsed) {
        nextItem = this.getNextItemRecursive(item, orderItem.subItems, targetItem, recursiveCount + 1);
      }
    }

    if (recursiveCount === 0 && !nextItem && this.props.rollover) {
      return this.state.listMap[this.state.listOrder[0].id];
    }

    return nextItem;
  }

  getPreviousItem(item: TreeListMapItem): TreeListMapItem | undefined {
    return this.getPreviousItemRecursive(item);
  }

  getPreviousItemRecursive(
    item: TreeListMapItem,
    orderItems: TreeListOrder[] = this.state.listOrder,
    targetItem: { wasFound: boolean } = { wasFound: false },
    recursiveCount: number = 0,
  ): TreeListMapItem | undefined {
    let prevItem;
    for (const orderItem of orderItems) {
      const currentItem = this.state.listMap[orderItem.id];
      if (orderItem.id === item.id || targetItem.wasFound) {
        targetItem.wasFound = true;
        break;
      }
      prevItem = currentItem;

      if (orderItem.subItems.length && !currentItem.collapsed) {
        const childItem = this.getPreviousItemRecursive(item, orderItem.subItems, targetItem, recursiveCount + 1);
        if (childItem) {
          prevItem = childItem;
          break;
        }
      }
    }

    if (recursiveCount === 0 && !prevItem && this.props.rollover) {
      return this.state.listMap[this.state.listOrder[this.state.listOrder.length-1].id];
    }

    return prevItem;
  }

  flattenList(list: TreeListItem[]): [TreeListMap, TreeListOrder[]] {
    return this.flattenListRecursive(list) as [TreeListMap, TreeListOrder[]];
  }

  // Separate an array of items into a flat hash map, and preserve the order through a TreeListOrder array
  //
  // "list" is the only parameter that should be passed in - everything else is used purely by the function itself
  flattenListRecursive(
    list: TreeListItem[],
    flatList: TreeListMap = {},
    parentId?: string,
    callCount: number = 0,
    order: TreeListOrder[] = [],
  ): [string[], TreeListOrder[]] | [TreeListMap, TreeListOrder[]] {
    const childIds = [];
    const parentSubItems = [];

    for (const item of list) {
      const itemDetails: TreeListMapItem = {
        id: item.id,
        label: item.label,
        parentId: parentId,
        childIds: [],
      };
      const itemOrder: TreeListOrder = {
        id: item.id,
        subItems: [],
      }
      flatList[item.id] = itemDetails;
      childIds.push(item.id);
      order.push(itemOrder);
      parentSubItems.push(itemOrder);

      if (item.subItems) {
        // Add child items to the flatList, and also add their ids to the current item
        const [childIds, subItems] = this.flattenListRecursive(item.subItems, flatList, item.id, callCount + 1, itemOrder.subItems);
        itemDetails.childIds = childIds as string[];
      }
    }

    // Return the childIds purely for recursion, otherwise return the completed flatList and order
    return callCount ? [childIds, parentSubItems] : [flatList, order];
  }
}