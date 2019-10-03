import React from 'react';
import { TreeList } from '../components/tree-list/tree-list';
import { getNextUniqueId } from '../utils/utils';
import { TreeListController } from '../components/tree-list-controller/tree-list-controller';

export default {
  title: 'Tree List',
};

const data = [
  {
    id: getNextUniqueId(),
    label: 'Doggo',
    subItems: [
      {
        id: getNextUniqueId(),
        label: 'Dogget',
      }
    ],
  }, {
    id: getNextUniqueId(),
    label: 'Cat',
  }
]

export const List = () => (
  <TreeListController
    list={ data }
  ></TreeListController>
);