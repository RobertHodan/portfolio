import React from 'react';
import { TreeList, TreeListItemProps } from '../tree-list/tree-list';
import triangle from './svgs/triangle.svg';
import { ListItemProps } from '../list-item/list-item';
import { TreeListMap } from '../tree-list-controller/tree-list-controller';
import './collapsible-item.scss';

export type CollapsibleItemProps = ListItemProps & {
  listMap: TreeListMap,
  childIds: string[],
  onLabelClick?: (props: TreeListItemProps, event: React.MouseEvent) => void,
  onItemClick?: (props: TreeListItemProps, event: React.MouseEvent) => void,
  functionItemContent?: () => React.ReactNode,
  collapsed?: boolean,
}

export class CollapsibleItem extends React.Component<CollapsibleItemProps> {
  static defaultProps = {
    childIds: [],
  }
  preventClick: boolean = false;

  handleOnLabelClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (this.props.onLabelClick) {
      this.props.onLabelClick(this.props, event);
      this.preventClick = true;
    }
  }

  handleOnItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.props.onItemClick && !this.preventClick) {
      this.props.onItemClick(this.props, event);
    }
    this.preventClick = false;
  }

  render() {
    const {collapsed, childIds, functionItemContent, ...props} = this.props;
    let className = 'collapsible-item';
    className += collapsed ? ' collapsed' : ' expanded';
    if (childIds.length) {
      className += ' has-children';
    }
    // @ts-ignore
    const content = functionItemContent ? functionItemContent(this.props) : this.props.label;

    return (
      <div className={className}>
        <div onClick={ this.handleOnItemClick }>
          <span className="collapse-icon-container" onClick={ this.handleOnLabelClick }>
            {content}
          </span>
          {this.createExpandMarker()}
        </div>
        {this.createSubItems()}
      </div>
    )
  }

  createExpandMarker(): JSX.Element | undefined {
    const { childIds } = this.props;
    return childIds && childIds.length ? (
        <img src={triangle}></img>
      )
      : undefined;
  }

  createSubItems(): JSX.Element | undefined {
    const { childIds, collapsed, listMap, onLabelClick, onItemClick } = this.props;
    if (collapsed) {
      return;
    }

    return childIds.length ? (
      <TreeList
        listMap={listMap}
        listOrder={childIds}
        onLabelClick={ onLabelClick }
        onItemClick={ onItemClick }
        functionItemContent={ this.props.functionItemContent }
        role={'group'}
      />
    ) : undefined;
  }
}
