import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import App from './components/App'
import './globalCss'

const rootSelector = '#root'
Modal.setAppElement(rootSelector)
ReactDOM.render(<App />, document.querySelector(rootSelector))
