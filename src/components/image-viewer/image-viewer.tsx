import React from 'react';
import './image-viewer.scss';

export type ImageViewerProps = {
  className?: string,
  children: React.ReactElement<HTMLImageElement> | React.ReactElement<HTMLImageElement>[],
  style?: React.CSSProperties;
}

export class ImageViewer extends React.Component<ImageViewerProps> {
  handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  }

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
