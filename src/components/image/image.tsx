import React from 'react';

export type ImageViewerProps = {
  src: string,
}

export class Image extends React.Component<ImageViewerProps> {
  render() {
    let imgClass;
    if (this.props.src.includes('svg')) {
      imgClass='is-svg';
    }

    return (
      <div className={'image-container'}>
        <img
          src={this.props.src}
          className={imgClass}
        ></img>
      </div>
    )
  }
}
