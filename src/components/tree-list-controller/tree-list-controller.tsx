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
  listMap: TreeListMap,
  rootIds: string[],
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
  static defaultProps = {
    rollover: true,
  }

  eventBindings: {
    [key: number]: string[],
  }

  focusedId?: string

  constructor(props: TreeListControllerProps) {
    super(props);
    let [list, rootIds] = this.flattenList(props.list);

    // DEBUGGING
    window.TreeList = this;

    // Ensure that the first item starts off focused, so that it can be tabbed to via keyboard
    list = update(list, {
      [rootIds[0]]: {
        $merge: {
          focused: true,
        },
      },
    });

    this.state = {
      rootIds: rootIds,
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
    const {rootIds, listMap} = this.state;

    return (
      <TreeList
        listMap={ listMap }
        listOrder={ rootIds }
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
      this.expandItem(focusedItem);
    } else {
      this.stepIntoItem(focusedItem);
    }
  }

  stepOutOrCollapse() {
    const focusedItem = this.getFocusedItem();
    if (!focusedItem.collapsed && focusedItem.childIds.length) {
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

  expandItem(item: TreeListMapItem) {
    this.collapseItem(item, false);
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
    return this.state.listMap[ item.childIds[ index ] ];
  }

  getFocusedItem(): TreeListMapItem {
    const map = this.state.listMap;
    const id = this.focusedId;
    const firstId = this.state.rootIds[0];

    // Return the focused item, or default to the first item if there's no focus currently
    return id ? (map[id] || map[firstId]) : map[firstId];
  }

  getNextItem(item: TreeListMapItem): TreeListMapItem | undefined {
    const siblings = this.getSiblingIds(item);
    const index = this.getItemIndex(item, siblings);
    const map = this.state.listMap;
    let nextItem: TreeListMapItem | undefined;
    if (item.childIds.length && !item.collapsed) {
      nextItem = map[ item.childIds[0] ];
    }

    if (index == siblings.length-1 && item.parentId && !nextItem) {
      const parent = map[item.parentId];
      const parentSiblings = this.getSiblingIds(parent);
      const parentIndex = this.getItemIndex(parent, parentSiblings);

      if (parentIndex !== parentSiblings.length-1) {
        nextItem = map[ parentSiblings[parentIndex+1] ];
      }
    }

    if (index < siblings.length-1 && !nextItem) {
      nextItem = map[ siblings[index+1] ];
    }

    if (!nextItem && this.props.rollover) {
      // Return first item
      nextItem = map[ this.state.rootIds[0] ];
    }

    return nextItem;
  }

  getPreviousItem(item: TreeListMapItem): TreeListMapItem | undefined {
    const siblings = this.getSiblingIds(item);
    const index = this.getItemIndex(item, siblings);
    let prevItem: TreeListMapItem | undefined;
    const map = this.state.listMap;

    if (index === 0) {
      if (item.parentId) {
        prevItem = map[item.parentId];
      }
    } else {
      const siblingId = siblings[index-1];
      prevItem = map[siblingId];

      // If the sibling has children, then use its last child instead
      if (prevItem.childIds.length && !prevItem.collapsed) {
        const childId = prevItem.childIds[prevItem.childIds.length-1];
        prevItem = map[childId];
      }
    }

    if (!prevItem && this.props.rollover) {
      return this.getLastItem();
    }

    return prevItem;
  }

  getLastItem(childIds: string[] = this.state.rootIds): TreeListMapItem {
    const lastId = childIds[childIds.length-1];
    const lastItem = this.state.listMap[lastId];

    return (lastItem.childIds.length && !lastItem.collapsed) ? this.getLastItem(lastItem.childIds) : lastItem;
  }

  getItemIndex(item: TreeListMapItem, siblingIdsParam?: string[]): number {
    const siblingIds = siblingIdsParam || this.getSiblingIds(item);

    return siblingIds.indexOf(item.id);
  }

  getSiblingIds(item: TreeListMapItem): string[] {
    return item.parentId ? this.state.listMap[item.parentId].childIds : this.state.rootIds;
  }

  flattenList(list: TreeListItem[]): [TreeListMap, string[]] {
    return this.flattenListRecursive(list);
  }

  // Separate an array of items into a flat hash map, and preserve the order through a TreeListOrder array
  //
  // "list" is the only parameter that should be passed in - everything else is used purely by the function itself
  flattenListRecursive(
    list: TreeListItem[],
    flatList: TreeListMap = {},
    parentId?: string,
    recursiveCount: number = 0,
  ): [TreeListMap, string[]] {
    const siblings = [];

    for (const item of list) {
      const itemDetails: TreeListMapItem = {
        id: item.id,
        label: item.label,
        parentId: parentId,
        childIds: [],
      };

      flatList[item.id] = itemDetails;
      siblings.push(item.id);

      if (item.subItems) {
        // Add child items to the flatList, and also add their ids to the current item
        const [flat, childIds] = this.flattenListRecursive(item.subItems, flatList, item.id, recursiveCount + 1);
        itemDetails.childIds = childIds as string[];
      }
    }

    // Return the childIds purely for recursion, otherwise return the completed flatList and order
    return [flatList, siblings];
  }
}