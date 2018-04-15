import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import NotFoundPage from './NotFoundPage'

const client = new ApolloClient({ uri: 'http://localhost:4000' })

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Fragment>
      </Router>
    </ApolloProvider>
  )
}

export default App
