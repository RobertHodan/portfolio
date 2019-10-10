import { TreeListItem, TreeListMap, TreeListMapItem } from "../components/tree-list-controller/tree-list-controller";

let id = 0;
export function getNextUniqueId() {
    return `componentId-${id += 1}`;
}

export function flattenList(list: TreeListItem[]): [TreeListMap, string[]] {
    return flattenListRecursive(list);
}

// Separate an array of items into a flat hash map, and preserve the order through a TreeListOrder array
//
// "list" is the only parameter that should be passed in - everything else is used purely by the function itself
function flattenListRecursive(
    list: TreeListItem[],
    flatList: TreeListMap = {},
    parentId?: string,
    recursiveCount: number = 0,
    rootParentId?: string,
): [TreeListMap, string[]] {
const siblings = [];

for (const item of list) {
    const itemDetails: TreeListMapItem = {
        id: item.id,
        label: item.label,
        parentId: parentId,
        childIds: [],
        rootParentId: rootParentId,
        collapsed: true,
    };

    flatList[item.id] = itemDetails;
    siblings.push(item.id);

    if (item.subItems) {
    rootParentId = (recursiveCount === 0) ? item.id : rootParentId;
    // Add child items to the flatList, and also add their ids to the current item
    const [flat, childIds] = flattenListRecursive(item.subItems, flatList, item.id, recursiveCount + 1, rootParentId);
    itemDetails.childIds = childIds as string[];
    }
}

// Return the childIds purely for recursion, otherwise return the completed flatList and order
return [flatList, siblings];
}
