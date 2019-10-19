import React from 'react';
import './caption.scss';

export type CaptionProps = {
  className?: string,
  caption: React.ReactNode,
  children: React.ReactNode,
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export class Caption extends React.Component<CaptionProps> {
  render() {
    const { className, onClick, children, caption } = this.props;

    return (
      <figure className={ className || 'caption' }>
        {children}
        <figcaption>
          {caption}
        </figcaption>
      </figure>
    )
  }
}
