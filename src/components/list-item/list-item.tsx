import React from 'react';
import { TreeList, TreeListItemProps } from '../tree-list/tree-list';
import './list-item.scss';
import triangle from './svgs/triangle.svg';
import { TreeListMap, TreeListOrder } from '../tree-list-controller/tree-list-controller';

export type ListItemProps = {
  label: string,
  listMap: TreeListMap,
  subItems: TreeListOrder[],
  className?: string,
  collapsed?: boolean,
  selected?: boolean,
  focused?: boolean,
}

export class ListItem extends React.Component<ListItemProps> {
  render() {
    let liClassName = this.props.className || 'list-item';
    if (this.props.focused) {
      liClassName += ' focused';
    }

    return <li className={liClassName} tabIndex={0}>
      <span>
        {this.props.label}
        {this.createExpandMarker()}
      </span>
      {this.createSubItems()}
    </li>
  }

  createExpandMarker(): JSX.Element | undefined {
    let imgClassNames = this.getImageClassNames();

    return this.props.subItems.length ?
      <img src={triangle} className={imgClassNames}></img>
      : undefined;
  }

  getImageClassNames(): string {
    const classNames = [];
    if (this.props.collapsed) {
      classNames.push('collapsed');
    }
    if (this.props.selected) {
      classNames.push('selected');
    }

    return classNames.join(' ');
  }

  createSubItems(): JSX.Element | undefined {
    return this.props.subItems && (
      <TreeList
        listMap={this.props.listMap}
        listOrder={this.props.subItems}
      />
    )
  }
}
