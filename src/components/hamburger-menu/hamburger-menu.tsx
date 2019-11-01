import React from 'react';
import { HamburgerIcon } from '../../icons/icons';
import './hamburger-menu.scss';

export type HamburgerMenuProps = {
  onClick?: (event: React.MouseEvent) => void,
  isMenuOpen?: boolean,
}

type HamburgerMenuState = {
  isMenuOpen: boolean,
}

export class HamburgerMenu extends React.Component<HamburgerMenuProps, HamburgerMenuState> {
  static defaultProps = {
    childIds: [],
    isMenuOpen: false,
  }
  state = {
    isMenuOpen: this.props.isMenuOpen !== undefined ? this.props.isMenuOpen : true,
  }
  preventClick: boolean = false;
  hamburgerRef: React.RefObject<HTMLButtonElement> = React.createRef();

  handleOnClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!this.state.isMenuOpen) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.removeProperty('overflow');
    }

    this.setState({isMenuOpen: !this.state.isMenuOpen})
  }

  handleWindowResize = () => {
    if (this.hamburgerRef.current) {
      const display = window.getComputedStyle(this.hamburgerRef.current, null).getPropertyValue('display');

      if (display === 'none') {
        this.setState({isMenuOpen: false});
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    if (this.hamburgerRef.current) {
      const display = window.getComputedStyle(this.hamburgerRef.current, null).getPropertyValue('display');

      if (display === 'none') {
        this.setState({isMenuOpen: false});
      }
    }
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    document.body.style.removeProperty('overflow');
  }

  render() {
    let className = 'hamburger-menu';

    return (
      <div className={className}>
        <button className={'icon-container'}
          tabIndex={0}
          onClick={this.handleOnClick}
          ref={this.hamburgerRef}
          aria-haspopup={true} aria-expanded={this.state.isMenuOpen}
        >
          {HamburgerIcon}
        </button>
        <div
          className={`child-container${!this.state.isMenuOpen ? ' collapsed' : ''}`}>
          {this.state.isMenuOpen ? this.props.children : undefined}
        </div>
      </div>
    )
  }
}
