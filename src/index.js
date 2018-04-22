import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import './globalCss'
import App from './components/App'

const rootSelector = '#root'
Modal.setAppElement(rootSelector)
ReactDOM.render(<App />, document.querySelector(rootSelector))
