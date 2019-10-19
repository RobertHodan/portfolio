import React from 'react';
import './button.scss';

export type ButtonProps = {
  className?: string,
  children: React.ReactNode,
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export class Button extends React.Component<ButtonProps> {
  render() {
    const { className, onClick, children } = this.props;

    return (
      <div className={`button ${className}`} role="button" onClick={onClick} tabIndex={0}>
        {children}
      </div>
    )
  }
}
