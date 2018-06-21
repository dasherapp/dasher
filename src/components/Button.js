import { bool, func, oneOf } from 'prop-types'
import styled from 'react-emotion'
import {
  colors,
  focusStyle,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  space,
  transition,
} from '../theme'
import { joinSpacing, propStyles, toAlpha } from '../utils/style'
import { cleanElement } from '../utils/utils'

const buttonStyles = {
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
    padding: space[1],
    color: colors.gray[6],
    backgroundColor: 'transparent',
    verticalAlign: 'middle',

    ':hover,:focus': {
      backgroundColor: toAlpha(colors.gray[1]),
    },
  },
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
    borderRadius: radii[1],
    outline: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    transition: `all ${transition.duration} ${transition.easing}`,
  },
  props => buttonStyles[props.buttonStyle],
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
  onClick: func,
}

Button.defaultProps = {
  buttonStyle: 'primary',
  disabled: false,
  onClick: () => {},
}

export default Button
