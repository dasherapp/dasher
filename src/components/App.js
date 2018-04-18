import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Apollo from './Apollo'
import Root from './Root'
import PrivateRoute from './PrivateRoute'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import CallbackPage from './CallbackPage'
import NotFoundPage from './NotFoundPage'

function App() {
  return (
    <Apollo>
      <Router>
        <Root>
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/callback" component={CallbackPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Root>
      </Router>
    </Apollo>
  )
}

export default App
