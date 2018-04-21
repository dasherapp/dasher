import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'glamor'
import Modal from 'react-modal'

import { fonts, colors } from './theme'
import App from './components/App'

css.global('body', {
  boxSizing: 'border-box',
  margin: 0,
  fontFamily: fonts.sans,
  backgroundColor: colors.gray[1],
})

css.global('*, *:before, *:after', {
  boxSizing: 'inherit',
})

const rootSelector = '#root'
Modal.setAppElement(rootSelector)
ReactDOM.render(<App />, document.querySelector(rootSelector))
