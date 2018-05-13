import 'dom-testing-library/extend-expect'
import React, { Fragment } from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { render } from 'react-testing-library'
import { AUTH_TOKEN_KEY, GITHUB_TOKEN_KEY } from '../../utils/auth'
import PrivateRoute from '../PrivateRoute'

function renderRoutes() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Fragment>
        <PrivateRoute
          exact
          path="/"
          component={() => <div>Example Page</div>}
        />
        <Route exact path="/login" component={() => <div>Login Page</div>} />
      </Fragment>
    </MemoryRouter>,
  )
}

it('renders correctly when logged in', () => {
  localStorage.setItem(AUTH_TOKEN_KEY, 'fake_auth_token')
  localStorage.setItem(GITHUB_TOKEN_KEY, 'fake_github_token')

  const { queryByText } = renderRoutes()

  expect(queryByText('Example Page')).toBeInTheDOM()
  expect(queryByText('Login Page')).not.toBeInTheDOM()

  localStorage.clear()
})

it('redirects to /login when logged out', () => {
  const { queryByText } = renderRoutes()

  expect(queryByText('Example Page')).not.toBeInTheDOM()
  expect(queryByText('Login Page')).toBeInTheDOM()
})
