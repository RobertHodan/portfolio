import { TreeListItem, TreeListMap, TreeListMapItem } from "../components/tree-list-controller/tree-list-controller";
import { ListMap, ListMapItem } from "../components/list/list";

let id = 0;
export function getNextUniqueId() {
    return `componentId-${id += 1}`;
}

export function createMapFromList<T>(list: (T & ListMapItem)[] | ListMapItem[], isTree?: boolean): [ListMap, string[]] {
    return flattenListRecursive(list, isTree);
}

export function createMapFromLabels(labels: string[]) {
    const list = [];
    for (const label of labels) {
        list.push({
            label: label,
            id: getNextUniqueId(),
        });
    }

    return createMapFromList(list);
}

export function removeClassNameByWhitelist(className: string, whitelist: string, splitter: string = ' '): string {
    if (!className.length) {
        return '';
    }
    const whitelistItems = whitelist.split(splitter);

    let classNames = className.split(splitter);
    classNames = classNames.filter((s) => whitelistItems.includes(s));

    classNames.sort();

    return classNames.join(splitter);
}

export function removeClassNameFromString(str: string, className: string, splitter: string = ' '): string {
    if (!str.length) {
        return '';
    }
    if (!className) {
        return str;
    }

    let strArr = str.split(splitter);
    strArr = strArr.filter((s) => s !== className);

    strArr.sort();

    return strArr.join(splitter);
}

export function concatStringsUnique(s1: string, s2: string, splitter: string = ' '): string {
  if (!s1.length) {
      return s2;
  } else if (!s2.length) {
      return s1;
  }
  const arr1 = s1.split(splitter);
  const arr2 = s2.split(splitter);

  for (const subStr of arr2) {
      if (!arr1.includes(subStr)) {
          arr1.push(subStr);
      }
  }

  arr1.sort();

  return arr1.join(splitter);
}

// Separate an array of items into a flat hash map, and preserve the order through a TreeListOrder array
//
// "list" is the only parameter that should be passed in - everything else is used purely by the function itself
function flattenListRecursive<T>(
    list: T[] & ListMapItem[] | T[] & TreeListItem[] | ListMapItem[] | TreeListItem[],
    isTree?: boolean,
    flatList: ListMap | TreeListMap = {},
    parentId?: string,
    recursiveCount: number = 0,
    rootParentId?: string,
): [TreeListMap | ListMap, string[]] {
const siblings = [];

  for (let item of list) {
    let itemDetails: TreeListMapItem | ListMapItem;
    siblings.push(item.id);

    if (isTree) {
      const { subItems, ...partialItemDetails } = item as TreeListItem;
      itemDetails = {
          parentId: parentId,
          childIds: [],
          rootParentId: undefined,
          collapsed: true,
          ...partialItemDetails,
      } as TreeListMapItem;
      flatList[item.id] = itemDetails;

      if (item.hasOwnProperty('subItems')) {
        rootParentId = (recursiveCount === 0) ? item.id : rootParentId;
        // Add child items to the flatList, and also add their ids to the current item
        const [flat, childIds] = flattenListRecursive((item as TreeListItem).subItems, isTree, flatList,
        item.id, recursiveCount + 1, rootParentId
        ) as [TreeListMap, string[]];
        (itemDetails as TreeListMapItem).childIds = childIds as string[];
      }
    } else {
        flatList[item.id] = item;
    }


  }

// Return the childIds purely for recursion, otherwise return the completed flatList and order
return [flatList, siblings];
}
