import React from 'react';
import { getNextUniqueId, flattenList } from '../utils/utils';
import { TreeListController } from '../components/tree-list-controller/tree-list-controller';
import 'normalize.css';

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
]

const [list, rootIds] = flattenList(data);

export const List = () => (
  <TreeListController
    listMap={ list }
    rootIds={ rootIds }
  ></TreeListController>
);