import React from 'react';
import update from 'immutability-helper';
import { TreeListItemProps, TreeListProps, TreeList } from '../tree-list/tree-list';

export type TreeListItem = {
  id: string,
  label?: string,
  subItems: TreeListItem[],
}

export interface TreeListControllerProps extends TreeListProps {
  listMap: TreeListMap,
  rootIds: string[],
  // If an item is selected, but it belongs to a collapsed parent, then show that parent as selected instead
  selectNearestParent: boolean,
  // If the end of the list is reached, roll over to the other side
  rollover: boolean,
  // Number in ms, determines if consecutive key inputs should be contactinated together into a string
  // before searching for which item to focus
  //
  // 0  = Will only search one letter at a time, no chaining.
  inputChainThreshold: number,
  // Treats a duplicate character as one single character. Eg. 'dd' will become 'd'
  // Used to make functionality a little more responsive
  inputChainTreatDoubleCharAsSingle: boolean,
};

export interface TreeListControllerState {
  listMap: TreeListMap,
  rootIds: string[],
}

export type TreeListMapItem = {
  id: string,
  label?: string,
  parentId?: string,
  childIds: string[],
  selected?: boolean,
  collapsed?: boolean,
  focused?: boolean,
  childSelected?: boolean,
  rootParentId?: string,
}

export type TreeListMap = {
  [id: string]: TreeListMapItem,
}

export const TreeListControllerEventNames = {
  PrevItem: 'PREVITEM',
  NextItem: 'NEXTITEM',
  StepOut: 'STEPOUT',
  StepIn: 'STEPIN',
  ToggleItem: 'TOGGLEITEM',
  FirstItem: 'FIRSTITEM',
  LastItem: 'LASTITEM',
  ToggleItemOrKeyPress: 'TOGGLEITEMORKEYPRESS',
  expandSiblings: 'EXPANDSIBLINGS',
  collapseSiblings: 'COLLAPSESIBLINGS',
}

export class TreeListController extends React.Component<TreeListControllerProps, TreeListControllerState> {
  static defaultProps = {
    rollover: true,
    inputChainThreshold: 500,
    inputChainTreatDoubleCharAsSingle: true,
    selectNearestParent: true,
  }

  eventBindings: {
    [key: string]: string[],
  }

  focusedId?: string;
  selectedIds: string[];
  // String of characters that will be used to match items
  keyString: string;
  // Used to modify the state multiple times between renders
  workingState?: TreeListControllerState;
  // Timeout that resets keyString
  keyTimeout?: number;
  // Remember the selected child, in the scenario where the parent is temporarily selected instead
  selectedChildId?: string;

  constructor(props: TreeListControllerProps) {
    super(props);

    // Ensure that the first item starts off focused, so that it can be tabbed to via keyboard
    const list = update(props.listMap, {
      [props.rootIds[0]]: {
        $merge: {
          focused: true,
        },
      },
    });

    this.state = {
      rootIds: props.rootIds,
      listMap: list,
    };

    const e = TreeListControllerEventNames;
    this.eventBindings = {
      [e.PrevItem]: ['ArrowUp'],
      [e.NextItem]: ['ArrowDown'],
      [e.StepOut]: ['ArrowLeft'],
      [e.StepIn]: ['ArrowRight'],
      [e.ToggleItem]: ['Enter'],
      [e.FirstItem]: ['Home'],
      [e.LastItem]: ['End'],
      // Space can be either Toggle Item, or a normal key press (when labels have spaces in them)
      [e.ToggleItemOrKeyPress]: [' '],
      [e.expandSiblings]: ['*'],
      [e.collapseSiblings]: ['/'],
    };

    this.keyString = '';
    this.selectedIds = [];
  }

  handleOnKeyDown = (event: React.KeyboardEvent) => {
    const eventName = this.getFirstEventName(event.key);
    if (eventName) {
      this.handleEvent(eventName, event.key);
    } else {
      this.focusItemByChar(event.key);
    }
  }

  handleLabelClick = (props: TreeListItemProps) => {
    const item = this.getItemById(props.id);
    if (item) {
      this.focusItem(item);
      this.selectItem(item);
    }
  }

  handleItemClick = (props: TreeListItemProps) => {
    const item = this.getItemById(props.id);
    if (item) {
      this.focusItem(item);
      this.collapseItem(item, !item.collapsed);
    }
  }

  render() {
    const {rootIds, listMap} = this.state;
    // Reset the working state so that it can be updated to the latest state
    this.workingState = undefined;

    return (
      <TreeList
        listMap={ listMap }
        listOrder={ rootIds }
        onKeyDown={ this.handleOnKeyDown }
        onLabelClick={ this.handleLabelClick }
        onItemClick={ this.handleItemClick }
      />
    );
  }

  updateItem(id: string, itemModifications: Partial<TreeListMapItem>) {
    const modifiedItems = {
      [id]: {
        $merge: itemModifications,
      },
    };

    if (!this.workingState) {
      this.workingState = this.state;
    }
    this.workingState.listMap = update(this.workingState.listMap, modifiedItems);

    this.setState(this.workingState);
  }

  // Assumes no two events will share the same key
  getFirstEventName(key: string): string | undefined {
    const keys = Object.keys(this.eventBindings);
    return keys.find((action: string) => {
      return this.eventBindings[action].includes(key);
    });
  }

  getItemById(id: string): TreeListMapItem {
    return this.state.listMap[id];
  }

  handleEvent(eventName: string, key: string) {
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
        this.selectFocusedItem();
        break;
      case eventNames.FirstItem:
        const firstItem = this.getItemById(this.state.rootIds[0]);
        this.focusItem(firstItem);
        break;
      case eventNames.LastItem:
        const lastItem = this.getLastItem();
        this.focusItem(lastItem);
        break;
      case eventNames.ToggleItemOrKeyPress:
        this.toggleItemOrKeyPress(key);
        break;
      case eventNames.expandSiblings:
        this.expandFocusedSiblings();
        break;
      case eventNames.collapseSiblings:
        this.collapseFocusedSiblings();
        break;
    }
  }

  toggleItemOrKeyPress(key: string) {
    if (this.keyString.length === 0) {
      this.selectFocusedItem();
    } else {
      this.focusItemByChar(key);
    }
  }

  expandFocusedSiblings() {
    this.collapseFocusedSiblings(false);
  }

  collapseFocusedSiblings(shouldCollapse: boolean = true) {
    const focusedItem = this.getFocusedItem();
    this.updateSiblings(focusedItem, { collapsed: shouldCollapse });
  }

  focusItemByChar(key: string) {
    if (key.length !== 1) {
      return;
    }

    const keyString = this.addToKeyString(key);
    this.focusItemByString(keyString);
  }

  focusItemByString(str: string) {
    const focusedItem = this.getFocusedItem();
    const item = this.getNextItemByStringRecursive(focusedItem, str, str.length !== 1);

    if (item) {
      this.focusItem(item, true, focusedItem);
    }
  }

  getNextItemByStringRecursive(
    item: TreeListMapItem,
    str: string,
    // Include the passed in item in the search
    includeGivenItem?: boolean,
    initialItem?: TreeListMapItem,
  ): TreeListMapItem | undefined {
    let foundItem;
    if (includeGivenItem && this.itemLabelStartsWith(item, str)) {
      foundItem = item;
    }

    const nextItem = this.getNextItem(item);
    if (nextItem && this.itemLabelStartsWith(nextItem, str)) {
      foundItem = nextItem;
    }

    if (!foundItem && nextItem && item !== initialItem) {
      foundItem = this.getNextItemByStringRecursive(nextItem, str, false, initialItem || item);
    }

    return foundItem;
  }

  itemLabelStartsWith(item: TreeListMapItem, str: string): boolean {
    if (!str.length || !item.label) {
      return false;
    }

    return (item.label.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) === 0);
  }

  addToKeyString(key: string): string {
    // If there's no threshold, always return back the most recent key pressed
    if (!this.props.inputChainThreshold) {
      return key;
    }

    if (this.keyTimeout) {
      window.clearTimeout(this.keyTimeout);
    }
    this.keyTimeout = window.setTimeout(() => {
      this.keyString = '';
    }, this.props.inputChainThreshold);

    this.keyString += key;
    if (this.props.inputChainTreatDoubleCharAsSingle && this.keyString.length == 2) {
      if (this.keyString[0] === this.keyString[1]) {
        return this.keyString = this.keyString[0];
      }
    }
    return this.keyString;
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

    const parent = this.getItemById(item.parentId);
    if (parent) {
      this.focusItem(parent);
    }
  }

  expandItem(item: TreeListMapItem) {
    this.collapseItem(item, false);
  }

  collapseItem(item: TreeListMapItem, isCollapsed: boolean) {
    this.updateItem(item.id, { collapsed: isCollapsed });
    if (this.props.selectNearestParent && item.childSelected) {
      this.selectItem(item, isCollapsed, false);
    }
  }

  selectFocusedItem() {
    const focusedItem = this.getFocusedItem();
    this.selectItem(focusedItem);
  }

  toggleItemSelect(item: TreeListMapItem) {
    this.selectItem(item, !item.selected);
  }

  selectItem(
    newItem: TreeListMapItem,
    isSelected: boolean = true,
    deselectPreviousSelections: boolean = true,
    selectedItems: TreeListMapItem[] = this.getSelectedItems(),
  ) {
    if (selectedItems && deselectPreviousSelections) {
      selectedItems.forEach((item: TreeListMapItem) => {
          this.updateItem(item.id, { selected: false });
          this.updateParentRecursive(item, { childSelected: false });
      });
    }

    this.updateItem(newItem.id, { selected: isSelected });
    this.updateParentRecursive(newItem, { childSelected: true });
    this.selectedIds.push(newItem.id);
  }

  updateParentRecursive(item: TreeListMapItem, updatedDetails: Partial<TreeListMapItem>) {
    if (item.parentId) {
      const parent = this.getItemById(item.parentId);
      this.updateItem(parent.id, updatedDetails);
      this.updateParentRecursive(parent, updatedDetails);
    }
  }

  updateSiblings(item: TreeListMapItem, updatedDetails: Partial<TreeListMapItem>) {
    const siblingIds = this.getSiblingIds(item);
    siblingIds.forEach((id: string) => {
      this.updateItem(id, updatedDetails);
    });
  }

  focusNextItem() {
    const focusedItem = this.getFocusedItem();
    const nextItem = this.getNextItem(focusedItem);
    if (!nextItem) {
      return;
    }

    this.focusItem(nextItem, true, focusedItem);
  }

  focusPreviousItem() {
    const focusedItem = this.getFocusedItem();
    const prevItem = this.getPreviousItem(focusedItem);
    if (!prevItem) {
      return;
    }

    this.focusItem(prevItem, true, focusedItem);
  }

  focusItem(newItem: TreeListMapItem, isFocused: boolean = true, prevItem: TreeListMapItem = this.getFocusedItem()) {
    this.updateItem(newItem.id, { focused: isFocused });
    if (prevItem && prevItem !== newItem) {
      this.updateItem(prevItem.id, { focused: false });
    }

    this.focusedId = newItem.id;
  }

  getChildItemByIndex(item: TreeListMapItem, index: number): TreeListMapItem | undefined {
    if (item.collapsed) {
      return;
    }

    return this.getItemById(item.childIds[index]);
  }

  getSelectedItems(): TreeListMapItem[] {
    const selectedItems: TreeListMapItem[] = [];
    this.selectedIds.forEach((id) => {
      const item = this.getItemById(id);
      if (item) {
        selectedItems.push(item);
      }
    });

    return selectedItems;
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
    const lastItem = this.getItemById(lastId);

    return (lastItem.childIds.length && !lastItem.collapsed) ? this.getLastItem(lastItem.childIds) : lastItem;
  }

  getItemIndex(item: TreeListMapItem, siblingIdsParam?: string[]): number {
    const siblingIds = siblingIdsParam || this.getSiblingIds(item);

    return siblingIds.indexOf(item.id);
  }

  getSiblingIds(item: TreeListMapItem): string[] {
    return item.parentId ? this.getItemById(item.parentId).childIds : this.state.rootIds;
  }
}