import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'glamor'
import Modal from 'react-modal'

import App from './components/App'

css.global('body', { margin: 0 })

const rootSelector = '#root'
Modal.setAppElement(rootSelector)
ReactDOM.render(<App />, document.querySelector(rootSelector))
