import React from 'react';
import './image-viewer.scss';

export type ImageViewerProps = {
  className?: string,
  style?: React.CSSProperties;
}

export class ImageViewer extends React.Component<ImageViewerProps> {
  render() {
    return (
      <div
        className={this.props.className || 'image-viewer'}
        style={this.props.style}
      >
        { this.props.children }
      </div>
    )
  }
}
