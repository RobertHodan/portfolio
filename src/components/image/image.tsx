import React from 'react';
import './image.scss';

export type ImageViewerProps = {
  src: string,
  className?: string,
}

export class Image extends React.Component<ImageViewerProps> {
  static defaultProps = {
    className: 'image-container',
  }

  render() {
    let { className } = this.props;
    if (this.props.src.includes('svg')) {
      className += ' is-svg';
    }

    return (
      <div className={className}>
        <img
          src={this.props.src}
        ></img>
      </div>
    )
  }
}
