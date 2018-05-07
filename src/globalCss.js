import { css } from 'glamor'

import { fonts, colors } from './theme'

css.global('body', {
  boxSizing: 'border-box',
  margin: 0,
  fontFamily: fonts.sans,
  backgroundColor: colors.gray[1],
  cursor: 'default',
})

css.global('*, *:before, *:after', {
  boxSizing: 'inherit',
})

css.global('button::-moz-focus-inner', {
  border: 0,
})
