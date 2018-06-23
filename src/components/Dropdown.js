import { func, number, oneOf, oneOfType, string } from 'prop-types'
import React, { Component } from 'react'
import posed from 'react-pose'
import system from 'system-components/emotion'
import Box from './Box'

const MenuTransition = posed.div({
  open: {
    scale: 1,
  },
  closed: {
    scale: 0,
    display: 'none',
  },
})

const Menu = system(
  {
    is: MenuTransition,
    align: 'right',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 'auto',
    px: 0,
    py: 1,
    mt: 1,
    bg: 'gray.9',
    borderRadius: 2,
    boxShadow: 3,
    zIndex: 1,
  },
  props => ({
    [props.align]: 0,
    overflow: 'hidden',
    transformOrigin: `top ${props.align}`,
  }),
)

Menu.displayName = 'Menu'

Menu.propTypes = {
  ...Menu.propTypes,
  align: oneOf(['right', 'left']),
}

const MenuItem = system(
  {
    is: 'button',
    role: 'menuitem',
    tabIndex: -1,
    display: 'block',
    width: 1,
    px: 4,
    py: 2,
    fontSize: 1,
    lineHeight: 'tight',
    textAlign: 'left',
    color: 'white',
    bg: 'transparent',

    hover: {
      backgroundColor: 'gray.7',
    },

    focus: {
      backgroundColor: 'gray.7',
    },
  },
  {
    fontFamily: 'inherit',
    border: 0,
    outline: 0,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
)

MenuItem.displayName = 'MenuItem'

const MenuDivider = system({
  is: 'div',
  width: 1,
  height: 0,
  mx: 0,
  my: 1,
  borderTop: '1px solid',
  borderColor: 'gray.8',
})

MenuDivider.displayName = 'MenuDivider'

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
    offsetTop: 1,
  }

  menuButtonRef = React.createRef()

  menuRef = React.createRef()

  state = {
    isOpen: false,
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
      <Box display="inline-block" position="relative">
        {renderMenuButton({ getMenuButtonProps: this.getMenuButtonProps })}
        <Menu
          pose={isOpen ? 'open' : 'closed'}
          align={align}
          minWidth={minWidth}
          mt={offsetTop}
        >
          <div role="menu" ref={this.menuRef}>
            {children}
          </div>
        </Menu>
      </Box>
    )
  }
}

export { MenuItem, MenuDivider }
export default Dropdown
