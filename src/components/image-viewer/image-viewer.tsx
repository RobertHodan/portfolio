import React from 'react';
import './image-viewer.scss';
import { Modal } from '../modal/modal';

export type ImageViewerProps = {
  className?: string,
  style?: React.CSSProperties,
  disableModal?: boolean,
}

type ImageViewerState = {
  modalOpen: boolean;
}

export class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {
  constructor(props: ImageViewerProps) {
    super(props);

    this.state = {
      modalOpen: false,
    }
  }

  handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (this.state.modalOpen && event.key === 'Escape') {
      this.toggleModal(false);
    }

    if (!this.state.modalOpen && (event.key === 'Enter' || event.key === ' ')) {
      this.toggleModal(true);
    }
  }

  handleOnClick = () => {
    this.toggleModal();
  }

  toggleModal(isOpen: boolean = !this.state.modalOpen) {
    if (this.props.disableModal) {
      return;
    }

    this.setState({modalOpen: isOpen});
  }

  render() {
    let modal;
    let onKeyDown;
    let onClick;
    if (!this.props.disableModal) {
      if (this.state.modalOpen) {
        modal = (
          <Modal>
            <ImageViewer
              disableModal={true}
            >
              {this.props.children}
            </ImageViewer>
          </Modal>
        );
      }

      onKeyDown = this.handleOnKeyDown;
      onClick = this.handleOnClick;
    }

    return (
      <div
        className={this.props.className || 'image-viewer'}
        style={this.props.style}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        { this.props.children }
        {modal}
      </div>
    )
  }
}
