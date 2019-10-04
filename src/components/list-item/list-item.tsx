import React from 'react';
import { TreeList, TreeListItemProps } from '../tree-list/tree-list';
import './list-item.scss';
import triangle from './svgs/triangle.svg';
import { TreeListMap, TreeListOrder } from '../tree-list-controller/tree-list-controller';

export type ListItemProps = {
  label: string,
  listMap: TreeListMap,
  subItemIds: string[],
  className?: string,
  collapsed?: boolean,
  selected?: boolean,
  focused?: boolean,
}

export class ListItem extends React.Component<ListItemProps> {
  liRef: React.RefObject<HTMLLIElement>

  constructor(props: ListItemProps) {
    super(props);

    this.liRef = React.createRef();
  }

  render() {
    const classNames = this.getClassNames(this.props.className || 'list-item');

    if (this.props.focused) {
      this.liRef.current && this.liRef.current.focus();
    }
    const tabIndex = this.props.focused ? 0 : -1;

    return <li className={classNames} tabIndex={tabIndex} ref={this.liRef}>
      <span>
        {this.props.label}
        {this.createExpandMarker()}
      </span>
      {this.createSubItems()}
    </li>
  }

  createExpandMarker(): JSX.Element | undefined {
    return this.props.subItemIds.length ?
      <img src={triangle}></img>
      : undefined;
  }

  getClassNames(className?: string): string {
    const classNames = className ? [className] : [];
    if (this.props.collapsed) {
      classNames.push('collapsed');
    }
    if (this.props.selected) {
      classNames.push('selected');
    }

    return classNames.join(' ');
  }

  createSubItems(): JSX.Element | undefined {
    if (this.props.collapsed) {
      return;
    }

    return this.props.subItemIds && (
      <TreeList
        listMap={this.props.listMap}
        listOrder={this.props.subItemIds}
      />
    )
  }
}
