import React from 'react';
import { TreeList, TreeListItemProps } from '../tree-list/tree-list';
import './list-item.scss';
import triangle from './svgs/triangle.svg';
import { TreeListMap } from '../tree-list-controller/tree-list-controller';

export type ListItemProps = {
  id: string,
  label: string,
  listMap: TreeListMap,
  subItemIds: string[],
  className?: string,
  collapsed?: boolean,
  selected?: boolean,
  focused?: boolean,
  onSelect?: (id: string) => void,
  onClick?: (id: string) => void,
}

export class ListItem extends React.Component<ListItemProps> {
  liRef: React.RefObject<HTMLLIElement>

  constructor(props: ListItemProps) {
    super(props);

    this.liRef = React.createRef();
  }

  handleOnSelect = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.id);
      event.preventDefault();
    }
  }

  handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.props.onClick && !event.defaultPrevented) {
      this.props.onClick(this.props.id);
    }
  }

  render() {
    const classNames = this.getClassNames(this.props.className || 'list-item');

    if (this.props.focused) {
      this.liRef.current && this.liRef.current.focus();
    }
    const tabIndex = this.props.focused ? 0 : -1;

    return <li className={classNames} tabIndex={tabIndex} ref={this.liRef}>
      <div onClick={ this.handleOnClick }>
        <span className="collapse-icon-container" onClick={ this.handleOnSelect }>
          {this.props.label}
        </span>
        {this.createExpandMarker()}
      </div>
      {this.createSubItems()}
    </li>
  }

  createExpandMarker(): JSX.Element | undefined {
    return this.props.subItemIds.length ? (
        <img src={triangle}></img>
      )
      : undefined;
  }

  getClassNames(className?: string): string {
    const classNames = className ? [className] : [];
    if (this.props.collapsed) {
      classNames.push('collapsed');
    } else {
      classNames.push('expanded');
    }
    if (this.props.selected) {
      classNames.push('selected');
    }
    if (this.props.subItemIds.length) {
      classNames.push('has-children');
    }

    return classNames.join(' ');
  }

  createSubItems(): JSX.Element | undefined {
    if (this.props.collapsed) {
      return;
    }

    return this.props.subItemIds.length ? (
      <TreeList
        listMap={this.props.listMap}
        listOrder={this.props.subItemIds}
        onItemSelect={ this.props.onSelect }
        onItemClick={ this.props.onClick }
      />
    ) : undefined;
  }
}
