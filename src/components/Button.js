import { bool, oneOf } from 'prop-types'
import { themeGet } from 'styled-system'
import system from 'system-components/emotion'
import { propStyles } from '../utils/style'
import { duration, timingFunction, transitionProperty } from '../utils/style'

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

const Button = system(
  {
    is: 'button',
    buttonStyle: 'primary',
    disabled: false,
    display: 'inline-block',
    px: 3,
    py: 2,
    fontSize: 1,
    fontWeight: 'bold',
    lineHeight: 'tight',
    borderRadius: 2,
    timingFunction: 'standard',
    duration: 1,
    transitionProperty: ['background-color', 'box-shadow'],
  },
  {
    fontFamily: 'inherit',
    textDecroation: 'none',
    border: 0,
    outline: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
  },
  props => buttonStyles[props.buttonStyle](props),
  propStyles({
    disabled: {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  }),
  timingFunction,
  duration,
  transitionProperty,
)

Button.displayName = 'Button'

Button.propTypes = {
  ...Button.propTypes,
  buttonStyle: oneOf(['primary', 'secondary', 'danger', 'icon']),
  disabled: bool,
}

Button.defaultProps.blacklist = [
  ...Object.keys(Button.propTypes),
  ...Object.keys(timingFunction.propTypes),
  ...Object.keys(duration.propTypes),
  ...Object.keys(transitionProperty.propTypes),
]

export default Button
