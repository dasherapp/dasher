import { oneOf } from 'prop-types'
import { themeGet } from 'styled-system'
import system from 'system-components/emotion'
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
    display: 'inline-block',
    px: 3,
    py: 2,
    fontSize: 1,
    fontWeight: 'bold',
    lineHeight: 'tight',
    borderRadius: 2,
    border: 0,
    timingFunction: 'standard',
    duration: 1,
    transitionProperty: 'background-color, box-shadow',
  },
  {
    fontFamily: 'inherit',
    verticalAlign: 'middle',
    textAlign: 'center',
    textDecoration: 'none',
    outline: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',

    '&:disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
  props => buttonStyles[props.buttonStyle](props),
  timingFunction,
  duration,
  transitionProperty,
)

Button.displayName = 'Button'

Button.propTypes = {
  ...Button.propTypes,
  ...timingFunction.propTypes,
  ...duration.propTypes,
  ...transitionProperty.propTypes,
  buttonStyle: oneOf(['primary', 'secondary', 'danger', 'icon']),
}

Button.defaultProps = {
  ...Button.defaultProps,
  blacklist: Object.keys(Button.propTypes),
}

export default Button
