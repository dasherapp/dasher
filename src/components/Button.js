import { bool, func, oneOf } from 'prop-types'
import glamorous from 'glamorous'

import {
  radii,
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  transition,
} from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'

const kinds = {
  primary: {
    color: colors.white,
    backgroundColor: colors.indigo[7],

    ':hover': {
      backgroundColor: colors.indigo[9],
    },

    ':focus': {
      boxShadow: `0 0 0 3px ${toAlpha(colors.indigo[3])}`,
    },
  },
  secondary: {
    color: toAlpha(colors.gray[9]),
    backgroundColor: 'transparent',

    ':hover': {
      backgroundColor: toAlpha(colors.gray[1]),
    },

    ':focus': {
      boxShadow: `0 0 0 3px ${toAlpha(colors.gray[3])}`,
    },
  },
  danger: {
    color: colors.white,
    backgroundColor: colors.red[7],

    ':hover': {
      backgroundColor: colors.red[9],
    },

    ':focus': {
      boxShadow: `0 0 0 3px ${toAlpha(colors.red[3])}`,
    },
  },
}

const Button = glamorous.button(
  {
    display: 'inline-block',
    padding: joinSpacing(spacing[1], spacing[2]),
    fontFamily: 'inherit',
    fontSize: fontSizes[1],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    textDecoration: 'none',
    border: 'none',
    borderRadius: radii[0],
    outline: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    transition: `all ${transition.duration} ${transition.easing}`,
  },
  ({ kind }) => kinds[kind],
  ({ fullWidth }) =>
    fullWidth && {
      display: 'flex',
      width: '100%',
    },
  ({ disabled }) =>
    disabled && {
      opacity: 0.5,
      pointerEvents: 'none',
    },
)

Button.propTypes = {
  kind: oneOf(['primary', 'secondary', 'danger']),
  disabled: bool,
  fullWidth: bool,
  onClick: func,
}

Button.defaultProps = {
  kind: 'primary',
  disabled: false,
  fullWidth: false,
  onClick: () => {},
}

export default Button
