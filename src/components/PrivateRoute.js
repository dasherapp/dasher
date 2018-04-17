import React from 'react'
import { oneOfType, element, func } from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { isLoggedIn } from '../utils/auth'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: oneOfType([element, func]).isRequired,
}

export default PrivateRoute
