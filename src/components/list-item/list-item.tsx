import React from 'react';
import './list-item.scss';
import { TreeListMap } from '../tree-list-controller/tree-list-controller';
import { ListMap } from '../list/list';
import { CollapsibleItem } from '../collapsible-item/collapsible-item';
import { SimpleLabel } from '../simple-item/simple-item';

export type ListItemProps = {
  id: string,
  label?: string,
  className?: string,
  selected?: boolean,
  focused?: boolean,
  tabIndex?: number,
  role?: string,
  ariaExpanded?: boolean,
  onClick?: (props: ListItemProps, event: React.MouseEvent) => void,
  functionItem?: (props: ListItemProps) => React.ReactNode,
}

export class ListItem extends React.Component<ListItemProps> {
  static defaultProps: {
    tabIndex: 0,
  }
  liRef: React.RefObject<HTMLLIElement>

  constructor(props: ListItemProps) {
    super(props);

    this.liRef = React.createRef();
  }

  handleOnClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (this.props.onClick) {
      this.props.onClick(this.props, event);
    }
  }

  render() {
    const { focused, tabIndex, role, ariaExpanded } = this.props;
    const classNames = this.getClassNames(this.props.className || 'list-item');

    if (focused) {
      this.liRef.current && this.liRef.current.focus();
    }

    return (
      <li
        className={classNames}
        ref={this.liRef}
        onClick={this.handleOnClick}
        tabIndex={tabIndex}
        role={role}
        aria-expanded={ariaExpanded}
      >
        {this.getItemContent()}
      </li>
    )
  }

  getItemContent() {
    const {functionItem, children} = this.props;

    // Check for custom children
    if (functionItem) {
      return functionItem(this.props);
    }

    if (children) {
      return children;
    }

    return (
      <SimpleLabel
        {...this.props}
      ></SimpleLabel>
    );
  }

  getClassNames(className?: string): string {
    const classNames = className ? [className] : [];
    if (this.props.selected) {
      classNames.push('selected');
    }

    return classNames.join(' ');
  }
}
