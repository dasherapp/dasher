import glamorous from 'glamorous'
import { fonts } from '../theme'

const Root = glamorous.div({
  fontFamily: fonts.sans,
  boxSizing: 'border-box',

  ' *, *:before, *:after': {
    boxSizing: 'inherit',
  },
})

export default Root
