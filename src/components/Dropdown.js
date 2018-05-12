import React, { Component } from 'react'
import { oneOf, oneOfType, func, string, number } from 'prop-types'
import styled from 'react-emotion'
import posed from 'react-pose'
import { withProps } from 'recompose'

import {
  spacing,
  colors,
  radii,
  fontSizes,
  lineHeights,
  shadows,
  transition,
} from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'
import { cleanElement } from '../utils/utils'

const MenuContainer = styled.div({
  position: 'relative',
  display: 'inline-block',
})

const MenuTransition = posed.div({
  open: {
    scale: 1,
  },
  closed: {
    scale: 0,
    display: 'none',
  },
})

const Menu = styled(
  cleanElement({ type: MenuTransition, includeProps: ['pose'] }),
)(props => ({
  position: 'absolute',
  [props.align]: 0,
  display: 'flex',
  flexDirection: 'column',
  minWidth: props.minWidth,
  marginTop: props.offsetTop,
  padding: joinSpacing(spacing[0], 0),
  backgroundColor: colors.gray[8],
  borderRadius: radii[1],
  boxShadow: shadows[3],
  overflow: 'hidden',
  transformOrigin: `top ${props.align}`,
  zIndex: 1,
}))

Menu.propTypes = {
  align: oneOf(['right', 'left']),
  minWidth: oneOfType([number, string]),
  offsetTop: oneOfType([number, string]),
}

Menu.defaultProps = {
  align: 'right',
  minWidth: 'auto',
  offsetTop: spacing[0],
}

const MenuItem = withProps({ role: 'menuitem', tabIndex: -1 })(
  styled.button({
    display: 'block',
    width: '100%',
    padding: joinSpacing(spacing[1], spacing[3]),
    fontFamily: 'inherit',
    fontSize: fontSizes[1],
    lineHeight: lineHeights.tight,
    textAlign: 'left',
    color: colors.white,
    backgroundColor: 'transparent',
    border: 0,
    outline: 0,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: `background-color ${transition.duration} ${transition.easing}`,

    ':hover,:focus': {
      backgroundColor: toAlpha(colors.gray[8], colors.black),
    },
  }),
)

const MenuDivider = styled.div({
  display: 'block',
  width: '100%',
  height: 0,
  borderTop: `1px solid ${toAlpha(colors.gray[9], colors.black)}`,
  margin: joinSpacing(spacing[0], 0),
})

class Dropdown extends Component {
  static propTypes = {
    renderMenuButton: func.isRequired,
    align: oneOf(['right', 'left']),
    minWidth: oneOfType([number, string]),
    offsetTop: oneOfType([number, string]),
  }

  static defaultProps = {
    align: 'right',
    minWidth: 'auto',
    offsetTop: spacing[0],
  }

  constructor(props) {
    super(props)

    this.menuButtonRef = React.createRef()
    this.menuRef = React.createRef()

    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    this.menuItems = this.menuRef.current.querySelectorAll('[role^="menuitem"]')

    if (this.menuItems.length < 1) {
      throw new Error('No menu items')
    }

    const activeMenuItems = Array.prototype.filter.call(
      this.menuItems,
      item => !item.disabled,
    )

    // Disable menu button if all menu items are disabled
    if (activeMenuItems.length < 1) {
      this.menuButtonRef.current.disabled = true
      return
    }

    this.firstItem = this.menuItems[0]
    this.lastItem = this.menuItems[this.menuItems.length - 1]

    Array.prototype.forEach.call(this.menuItems, menuItem => {
      menuItem.addEventListener('keydown', this.handleMenuItemKeyDown)
    })

    this.menuButtonRef.current.addEventListener(
      'keydown',
      this.handleMenuButtonKeyDown,
    )
  }

  componentWillUnmount() {
    // Remove all event listeners when component unmounts

    Array.prototype.forEach.call(this.menuItems, menuItem => {
      menuItem.removeEventListener('keydown', this.handleMenuItemKeyDown)
    })

    this.menuButtonRef.current.removeEventListener(
      'keydown',
      this.handlMenuButtonKeyDown,
    )

    document.removeEventListener('click', this.close)
  }

  handleMenuButtonKeyDown = event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      // If the menu is open, then select the first active menu item.
      // Otherwise, open the menu.
      if (this.state.isOpen) {
        this.menuRef.current
          .querySelector('[role^="menuitem"]:not([disabled])')
          .focus()
      } else {
        this.open()
      }
    }

    if (event.key === 'Escape' || event.key === 'Tab') {
      this.close()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      this.menuButtonRef.current.focus()
    }
  }

  handleMenuItemKeyDown = event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      this.focusNext(event.target, this.firstItem)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      this.focusNext(event.target, this.lastItem)
    }

    if (event.key === 'Tab') {
      this.close()
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
      this.menuButtonRef.current.focus()
    }
  }

  focusNext = (currentItem, startItem) => {
    // Menu items can be traversed circularly. startItem indicates
    // the next item to focus after reaching the end of the list.
    // startItem will either be the first or the last item.
    // If it is the first item, then traverse down the list.
    const goingDown = startItem === this.firstItem

    function getNextItem(element) {
      return (
        (goingDown
          ? element.nextElementSibling
          : element.previousElementSibling) || startItem
      )
    }

    let nextItem = getNextItem(currentItem)

    while (nextItem.disabled) {
      nextItem = getNextItem(nextItem)
    }

    // Focus the next menu item that's not disabled
    nextItem.focus()
  }

  open = () => {
    this.setState({ isOpen: true }, () => {
      document.addEventListener('click', this.close)
    })
  }

  close = () => {
    this.setState({ isOpen: false }, () => {
      document.removeEventListener('click', this.close)
    })
  }

  toggle = () => {
    this.state.isOpen ? this.close() : this.open()
  }

  getMenuButtonProps = ({ refKey = 'ref', ...props } = {}) => ({
    [refKey]: this.menuButtonRef,
    'aria-haspopup': true,
    'aria-expanded': this.state.isOpen,
    onClick: event => {
      event.preventDefault()
      this.toggle()
    },
    ...props,
  })

  render() {
    const {
      renderMenuButton,
      align,
      minWidth,
      offsetTop,
      children,
    } = this.props
    const { isOpen } = this.state

    return (
      <MenuContainer>
        {renderMenuButton({ getMenuButtonProps: this.getMenuButtonProps })}
        <Menu
          pose={isOpen ? 'open' : 'closed'}
          align={align}
          minWidth={minWidth}
          offsetTop={offsetTop}
        >
          <div role="menu" ref={this.menuRef}>
            {children}
          </div>
        </Menu>
      </MenuContainer>
    )
  }
}

export { MenuItem, MenuDivider }
export default Dropdown
