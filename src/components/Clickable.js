import glamorous from 'glamorous'

import { transition, focusStyle } from '../theme'

const Clickable = glamorous('button', { propsAreCssOverrides: true })({
  display: 'inline-block',
  margin: 0,
  padding: 0,
  background: 'transparent',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  transition: `all ${transition.duration} ${transition.easing}`,

  ':focus': focusStyle,
})

export default Clickable
