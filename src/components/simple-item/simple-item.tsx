import React from 'react';
import { ListItemProps } from '../list-item/list-item';


export class SimpleLabel extends React.Component<ListItemProps> {
  handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.props.onClick) {
      this.props.onClick(this.props, event);
    }
  }

  render() {
    return (
      <div onClick={ this.handleOnClick }>
        {this.props.label}
      </div>
    )
  }
}
