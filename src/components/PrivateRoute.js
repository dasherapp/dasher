import { element, func, oneOfType } from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
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
