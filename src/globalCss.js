import { injectGlobal } from 'react-emotion'

import { fonts, colors } from './theme'

injectGlobal({
  body: {
    boxSizing: 'border-box',
    margin: 0,
    fontFamily: fonts.sans,
    backgroundColor: colors.gray[1],
    cursor: 'default',
  },

  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },

  'button::-moz-focus-inner': {
    border: 0,
  },
})
