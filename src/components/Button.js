import { bool, oneOf } from 'prop-types'
import styled from 'react-emotion'
import { themeGet } from 'styled-system'
import {
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  space,
  transition,
} from '../theme'
import { joinSpacing, propStyles } from '../utils/style'
import { cleanElement } from '../utils/utils'

const buttonStyles = {
  primary: props => ({
    color: themeGet('colors.white')(props),
    backgroundColor: themeGet('colors.indigo.7')(props),

    '&:hover': {
      backgroundColor: themeGet('colors.indigo.9')(props),
    },

    '&:focus': themeGet('focusStyle')(props),
  }),

  secondary: props => ({
    color: themeGet('colors.grayAlpha.9')(props),
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: themeGet('colors.grayAlpha.1')(props),
    },

    '&:focus': themeGet('focusStyle')(props),
  }),

  danger: props => ({
    color: themeGet('colors.white')(props),
    backgroundColor: themeGet('colors.red.7')(props),

    '&:hover': {
      backgroundColor: themeGet('colors.red.9')(props),
    },

    '&:focus': themeGet('focusStyle')(props),
  }),

  icon: props => ({
    padding: themeGet('space.1')(props),
    color: themeGet('colors.gray.6')(props),
    backgroundColor: 'transparent',
    verticalAlign: 'middle',

    '&:hover, &:focus': {
      backgroundColor: themeGet('colors.grayAlpha.1')(props),
    },
  }),
}

const Button = styled(cleanElement({ type: 'button' }))(
  {
    display: 'inline-block',
    padding: joinSpacing(space[2], space[3]),
    fontFamily: 'inherit',
    fontSize: fontSizes[1],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    textDecoration: 'none',
    border: 0,
    borderRadius: radii[2],
    outline: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    transition: `all ${transition.duration} ${transition.easing}`,
  },
  props => buttonStyles[props.buttonStyle](props),
  propStyles({
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  }),
)

Button.propTypes = {
  buttonStyle: oneOf(['primary', 'secondary', 'danger', 'icon']),
  disabled: bool,
}

Button.defaultProps = {
  buttonStyle: 'primary',
  disabled: false,
}

export default Button
