import React from 'react';
import FocusTrap from 'focus-trap-react';
import { CloseIcon } from '../../icons/icons';
import { Button } from '../button/button';
import './modal.scss';

export type ModalProps = {
  onClick?: () => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void,
}

export class Modal extends React.Component<ModalProps> {
  render() {
    return (
      <FocusTrap>
        <div className={'modal'} role={'dialog'} aria-modal={true} onKeyDown={this.props.onKeyDown}>
          <div className={'modal-background'} onClick={this.props.onClick}></div>
          <Button className='close-button'>
            {CloseIcon}
          </Button>
          <div className={'modal-children'}>
            {this.props.children}
          </div>
        </div>
      </FocusTrap>
    )
  }
}
