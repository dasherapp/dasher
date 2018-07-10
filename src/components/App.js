import { ThemeProvider } from 'emotion-theming'
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider as Unstated } from 'unstated'
import theme from '../theme'
import Apollo from './Apollo'
import BoardPage from './BoardPage'
import CallbackPage from './CallbackPage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import ModalRoot from './ModalRoot'
import NotFoundPage from './NotFoundPage'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <Apollo>
      <Unstated>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </Unstated>
    </Apollo>
  )
}

export default App
