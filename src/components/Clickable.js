import { themeGet } from 'styled-system'
import system from 'system-components/emotion'

const Clickable = system(
  {
    is: 'button',
    m: 0,
    p: 0,
    bg: 'transparent',
    border: 0,
  },
  props => ({
    outline: 0,
    cursor: 'pointer',
    appearance: 'none',

    '&:focus': themeGet('focusStyle')(props),
  }),
  'borderRadius',
)

Clickable.displayName = 'Clickable'

export default Clickable
