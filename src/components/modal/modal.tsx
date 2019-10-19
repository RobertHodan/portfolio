import React from 'react';

export type ModalProps = {
}

export class Modal extends React.Component<ModalProps> {
  render() {
    return (
      <div className={'modal'} role={'dialog'} aria-modal={true}>
        <div className={'modal-background'}></div>
        {this.props.children}
      </div>
    )
  }
}
