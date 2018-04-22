import { css } from 'glamor'

import { fonts } from './theme'

css.global('body', {
  margin: 0,
  fontFamily: fonts.sans,
  boxSizing: 'border-box',
})

css.global('*, *:before, *:after', {
  boxSizing: 'inherit',
})
