import React from 'react';
import { getNextUniqueId } from '../utils/utils';
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
    label: 'Deep nesting',
    subItems: [
      {
        id: getNextUniqueId(),
        label: 'Doggo',
        subItems: [
          {
            id: getNextUniqueId(),
            label: 'Dogget',
            subItems: [
              {
                id: getNextUniqueId(),
                label: 'Doggy',
              },
              {
                id: getNextUniqueId(),
                label: 'Doggy',
              },
            ]
          },
          {
            id: getNextUniqueId(),
            label: 'Dogget',
          },
        ]
      },
      {
        id: getNextUniqueId(),
        label: 'Doggo',
      },
    ]
  },
  {
    id: getNextUniqueId(),
    label: 'Conclusion',
  }
]

export const List = () => (
  <TreeListController
    list={ data }
  ></TreeListController>
);