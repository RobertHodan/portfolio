import React from 'react';
import './button.scss';

export type ButtonProps = {
  className?: string,
  children?: React.ReactNode,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export class Button extends React.Component<ButtonProps> {
  render() {
    const { className, onClick, children } = this.props;

    return (
      <button className={`button ${className || ''}`} onClick={onClick}>
        {children}
      </button>
    )
  }
}
