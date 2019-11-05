import React from 'react';
import { ImageViewer } from '../image-viewer/image-viewer';
import './image-slider.scss';
import { List, ListMap, ListMapItem } from '../list/list';
import { getNextUniqueId, createMapFromList } from '../../utils/utils';
import { ListItemProps, ListItem } from '../list-item/list-item';
import { RadioItem } from '../radio-item/radio-item';
import { Button } from '../button/button';
import { Modal } from '../modal/modal';

export type ImageSliderProps = {
  className?: string,
  children: React.ReactNode,
  style?: React.CSSProperties,
  disableModal?: boolean,
}

type ImageSliderState = {
  selectedIndex: number;
  isModal: boolean;
}

export class ImageSlider extends React.Component<ImageSliderProps, ImageSliderState> {
  indicators: [ListMap, string[]];
  preventDefaultClick: boolean;

  constructor(props: ImageSliderProps) {
    super(props);
    this.indicators = this.createIndicatorData();
    this.preventDefaultClick = false;

    this.state = {
      selectedIndex: 0,
      isModal: false,
    }
  }

  handleOnClick = () => {
    if (this.preventDefaultClick) {
      this.preventDefaultClick = false;
      return;
    }
  }

  handlePrevButtonClick = () => {
    this.preventDefaultClick = true;
    this.prevImage();
  }

  handleNextButtonClick = () => {
    this.preventDefaultClick = true;
    this.nextImage();
  }

  handleIndicatorClick = (props: ListItemProps) => {
    const index = this.indicators[1].indexOf(props.id);
    this.setImage(index);
  }

  handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if ((event.target as HTMLDivElement).className.includes('prev')) {
        this.prevImage();
      }
      else if ((event.target as HTMLDivElement).className.includes('next')) {
        this.nextImage()
      } else if (!this.state.isModal) {
        this.toggleModal(true);
      }
    }

    if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'Escape') {
      this.toggleModal(false);
    }
  }

  toggleModal(isOpen: boolean = !this.state.isModal) {
    // Leave modal creation until later
    // Lots of work will be needed for this to work properly
    return;
    if (this.props.disableModal) {
      return;
    }

    this.setState({isModal: isOpen})
  }

  nextImage() {
    this.setImage(this.state.selectedIndex+1);
  }

  prevImage() {
    this.setImage(this.state.selectedIndex-1);
  }

  setImage(index: number) {
    if (!Array.isArray(this.props.children)) {
      return;
    }

    let newIndex = index;
    if (newIndex >= this.props.children.length) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = this.props.children.length - 1;
    }

    this.setState({selectedIndex: newIndex});
  }

  render() {
    const { isModal } = this.state;
    const content = this.createImageSliderContent();
    const modal = isModal ? (
      <Modal>
        <ImageViewer
          disableModal={ true }
          {...this.props}
        >
        </ImageViewer>
      </Modal>
    ) : undefined;

    return (
      <>
        <div
          className={ this.props.className || 'image-slider' }
          style={ this.props.style }
          onClick={ this.handleOnClick }
          onKeyDown={ this.handleOnKeyDown }
          tabIndex={ 0 }
        >
          {content}
        </div>
        {modal}
      </>
    )
  }

  createImageSliderContent(): React.ReactNode {
    let image = this.getImageByIndex(this.state.selectedIndex);
    let indicators = this.createIndicators();

    return (
      <>
        {this.getArrowButton('prev-image-btn', this.handlePrevButtonClick)}
        {this.getArrowButton('next-image-btn', this.handleNextButtonClick)}
        {indicators}
        <ImageViewer
          style={this.props.style}
        >
         {image}
        </ImageViewer>
      </>
    )
  }

  createIndicatorData(): [ListMap, string[]] {
    const numOfImages = Array.isArray(this.props.children) ? this.props.children.length : 1;
    const list: ListMapItem[] = Array(numOfImages).fill(null).map(() => {
      return {
        id: getNextUniqueId(),
      }
    });

    return createMapFromList(list);
  }

  createIndicators() {
    const [list, listOrder] = this.indicators;
    const content = (props: ListItemProps) => {
      return (
        <ListItem
          key={props.id}
          onClick={this.handleIndicatorClick}
          {...props}
        >
          <RadioItem></RadioItem>
        </ListItem>
      )
    }

    return (
      <List
        listMap={list}
        listOrder={listOrder}
        functionItem={content}
        selectedId={listOrder[this.state.selectedIndex]}
        onItemClick={this.handleIndicatorClick}
      ></List>
    );
  }

  getArrowButton(className: string, onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) {
    return (
      <Button className={className} onClick={onClick}>
        <svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 3L5 20.3617L23 37" stroke="#AAAAAA" strokeWidth="6"/>
        </svg>
      </Button>
    )
  }

  getImageByIndex(index: number) {
    if (!Array.isArray(this.props.children)) {
      return this.props.children;
    }

    const image = this.props.children[index];
    if (!image) {
      console.error('No image found');
      return this.props.children[0];
    }

    return image;
  }
}
