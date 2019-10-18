import React from 'react';
import { getNextUniqueId, createMapFromList } from '../utils/utils';
import { TreeListController } from '../components/tree-list-controller/tree-list-controller';
import 'normalize.css';
import { List } from '../components/list/list';
import { TreeList } from '../components/tree-list/tree-list';

export default {
  title: 'Tree List',
};

const data = [
  {
    id: getNextUniqueId(),
    label: 'Overview',
  }, {
    id: getNextUniqueId(),
    label: 'Mockup',
    subItems: [
      {
        id: getNextUniqueId(),
        label: 'Grid View',
      },
      {
        id: getNextUniqueId(),
        label: 'Main Menu',
      }
    ],
  }, {
    id: getNextUniqueId(),
    label: 'Development',
    subItems: [
      {
        id: getNextUniqueId(),
        label: 'Tree List',
      },
      {
        id: getNextUniqueId(),
        label: 'Main Menu',
      },
    ]
  },
  {
    id: getNextUniqueId(),
    label: 'Conclusion',
  }
];

const dataFlat = [
  {
    id: getNextUniqueId(),
    label: 'Overview',
  }, {
    id: getNextUniqueId(),
    label: 'Mockup',
  }, {
    id: getNextUniqueId(),
    label: 'Development',
  },
  {
    id: getNextUniqueId(),
    label: 'Conclusion',
  }
];

const [list, rootIds] = createMapFromList(data);
const [list2, rootIds2] = createMapFromList(dataFlat);

export const ListExample = () => (
  <List
    listMap={ list2 }
    listOrder={ rootIds2 }
  ></List>
);

export const TreeListExample = () => (
  <TreeListController
    listMap={ list }
    rootIds={ rootIds }
  ></TreeListController>
);