import React, { Component } from 'react'
import glamorous, { Div } from 'glamorous'

import {
  spacing,
  colors,
  radii,
  fontSizes,
  lineHeights,
  shadows,
} from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'

const Relative = glamorous.div({
  position: 'relative',
})

const Menu = glamorous.div({
  position: 'absolute',
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: joinSpacing(spacing[0], 0),
  backgroundColor: colors.gray[8],
  borderRadius: radii[1],
  boxShadow: shadows[2],
})

export const MenuItem = glamorous.button({
  padding: joinSpacing(spacing[1], spacing[3]),
  fontFamily: 'inherit',
  fontSize: fontSizes[1],
  lineHeight: lineHeights.tight,
  textAlign: 'left',
  color: colors.white,
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  outline: 0,
  whiteSpace: 'nowrap',

  ':hover,:focus': {
    backgroundColor: toAlpha(colors.gray[7], colors.gray[8]),
  },
})

class Dropdown extends Component {
  state = {
    isOpen: false,
  }

  handleOutsideClick = event => {
    if (this.rootNode && this.rootNode.contains(event.target)) return

    this.toggleOpen()
  }

  toggleOpen = () => {
    // Add or remove event listener
    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }

    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { toggleComponent: Toggle, children } = this.props
    const { isOpen } = this.state
    return (
      <Relative innerRef={node => (this.rootNode = node)}>
        <Toggle
          onClick={event => {
            event.preventDefault()
            this.toggleOpen()
          }}
        />
        {isOpen && <Menu>{children}</Menu>}
      </Relative>
    )
  }
}

export default Dropdown
