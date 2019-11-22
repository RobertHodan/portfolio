import React from 'react';
import FocusTrap from 'focus-trap-react';
import { CloseIcon } from '../../icons/icons';
import { Button } from '../button/button';
import './modal.scss';

export type ModalProps = {
  onCloseClick?: () => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void,
}

export class Modal extends React.Component<ModalProps> {
  render() {
    return (
      <FocusTrap>
        <div className={'modal'} role={'dialog'} aria-modal={true} onKeyDown={this.props.onKeyDown}>
          <div className={'modal-background'}></div>
          <div className={'modal-children'}>
            {this.props.children}
          </div>
          <Button className='close-button' onClick={this.props.onCloseClick}>
            {CloseIcon}
          </Button>
        </div>
      </FocusTrap>
    )
  }

  componentDidMount() {
    document.body.style.setProperty('overflow', 'hidden')
  }

  componentWillUnmount() {
    document.body.style.removeProperty('overflow');
  }
}
