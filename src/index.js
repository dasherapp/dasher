import React from 'react'
import ReactDOM from 'react-dom'
import { css } from 'glamor'

import App from './components/App'

css.global('body', { margin: 0 })

ReactDOM.render(<App />, document.getElementById('root'))
