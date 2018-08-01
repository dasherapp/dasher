import system from 'system-components/emotion'
import { themeGet } from 'styled-system'

const Input = system(
  {
    is: 'input',
    type: 'text',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    px: 3,
    py: 2,
    m: 0,
    width: 1,
    border: 0,
    borderRadius: 2,
    color: 'inherit',
    bg: 'grayAlpha.1',

    focus: {
      backgroundColor: 'transparent',
    },
  },
  props => ({
    fontFamily: 'inherit',
    display: 'inline-block',
    verticalAlign: 'middle',
    appearance: 'none',
    outline: 0,

    '&:focus': {
      boxShadow: `inset 0 0 0 1px ${themeGet('colors.grayAlpha.5')(props)}`,
    },
  }),
)

Input.displayName = 'Input'

export default Input
