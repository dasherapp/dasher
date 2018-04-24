import React, { Fragment, Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'unstated'

import Apollo from './Apollo'
import DragDrop from './DragDrop'
import PrivateRoute from './PrivateRoute'
import ModalRoot from './ModalRoot'
import HomePage from './HomePage'
import BoardPage from './BoardPage'
import LoginPage from './LoginPage'
import CallbackPage from './CallbackPage'
import NotFoundPage from './NotFoundPage'

function App() {
  return (
    <Apollo>
      <Provider>
        <DragDrop>
          <Router>
            <Fragment>
              <ModalRoot />
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/board/:id" component={BoardPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/callback" component={CallbackPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Fragment>
          </Router>
        </DragDrop>
      </Provider>
    </Apollo>
  )
}

export default App
