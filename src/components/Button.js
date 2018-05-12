import { bool, func, oneOf } from 'prop-types'
import styled from 'react-emotion'

import {
  radii,
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  spacing,
  transition,
  focusStyle,
} from '../theme'
import { joinSpacing, toAlpha, propStyles } from '../utils/style'
import { createComponent } from '../utils/utils'

const kinds = {
  primary: {
    color: colors.white,
    backgroundColor: colors.indigo[7],

    ':hover': {
      backgroundColor: colors.indigo[9],
    },

    ':focus': focusStyle,
  },
  secondary: {
    color: toAlpha(colors.gray[9]),
    backgroundColor: 'transparent',

    ':hover': {
      backgroundColor: toAlpha(colors.gray[1]),
    },

    ':focus': focusStyle,
  },
  danger: {
    color: colors.white,
    backgroundColor: colors.red[7],

    ':hover': {
      backgroundColor: colors.red[9],
    },

    ':focus': focusStyle,
  },
  icon: {
    padding: spacing[0],
    color: colors.gray[6],
    backgroundColor: 'transparent',
    verticalAlign: 'middle',

    ':hover,:focus': {
      backgroundColor: toAlpha(colors.gray[1]),
    },
  },
}

const Button = styled(
  createComponent({ type: 'button', excludeProps: ['kind'] }),
)(
  {
    display: 'inline-block',
    padding: joinSpacing(spacing[1], spacing[2]),
    fontFamily: 'inherit',
    fontSize: fontSizes[1],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.tight,
    textDecoration: 'none',
    border: 0,
    borderRadius: radii[0],
    outline: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    transition: `all ${transition.duration} ${transition.easing}`,
  },
  props => kinds[props.kind],
  propStyles({
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  }),
)

Button.propTypes = {
  kind: oneOf(['primary', 'secondary', 'danger', 'icon']),
  disabled: bool,
  onClick: func,
}

Button.defaultProps = {
  kind: 'primary',
  disabled: false,
  onClick: () => {},
}

export default Button
