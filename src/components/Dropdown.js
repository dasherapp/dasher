import React, { Component } from 'react'
import { oneOf, oneOfType, element, func, node } from 'prop-types'
import glamorous from 'glamorous'

import {
  spacing,
  colors,
  radii,
  fontSizes,
  lineHeights,
  shadows,
} from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'
import Relative from './Relative'

const Menu = glamorous.div(props => ({
  position: 'absolute',
  [props.align]: 0,
  marginTop: spacing[0],
  display: 'flex',
  flexDirection: 'column',
  padding: joinSpacing(spacing[0], 0),
  backgroundColor: colors.gray[8],
  borderRadius: radii[1],
  boxShadow: shadows[3],
}))

export const MenuItem = glamorous.button({
  width: '100%',
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
    backgroundColor: toAlpha(colors.gray[8], colors.black),
  },
})

class Dropdown extends Component {
  static propTypes = {
    toggleComponent: oneOfType([element, func]).isRequired,
    align: oneOf(['right', 'left']),
    children: node,
  }

  static defaultProps = {
    align: 'right',
    children: null,
  }

  state = {
    isOpen: false,
  }

  componentDidMount() {
    this.rootNode.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount() {
    this.rootNode.removeEventListener('keydown', this.handleKeydown)
  }

  handleKeydown = event => {
    const escKeyCode = 27

    if (event.which === escKeyCode && this.state.isOpen) {
      this.toggleOpen()
    }
  }

  handleFocus = event => {
    if (!this.rootNode || !this.rootNode.contains(event.target)) {
      this.toggleOpen()
    }
  }

  toggleOpen = () => {
    // Add or remove event listeners
    if (!this.state.isOpen) {
      document.addEventListener('click', this.toggleOpen)
      document.addEventListener('focus', this.handleFocus, true)
    } else {
      document.removeEventListener('click', this.toggleOpen)
      document.removeEventListener('focus', this.handleFocus, true)
    }

    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { toggleComponent: Toggle, align, children } = this.props
    const { isOpen } = this.state

    return (
      <Relative
        innerRef={node => (this.rootNode = node)}
        display="inline-block"
      >
        <Toggle
          onClick={event => {
            event.preventDefault()
            this.toggleOpen()
          }}
        />
        {isOpen && <Menu align={align}>{children}</Menu>}
      </Relative>
    )
  }
}

export default Dropdown
