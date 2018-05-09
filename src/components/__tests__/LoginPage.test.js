import React, { Fragment } from 'react'
import { render } from 'react-testing-library'
import { MemoryRouter, Route } from 'react-router-dom'
import 'dom-testing-library/extend-expect'

import { AUTH_TOKEN_KEY, GITHUB_TOKEN_KEY } from '../../utils/auth'
import LoginPage from '../LoginPage'

function renderRoutes() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Fragment>
        <Route exact path="/" component={() => <div>Example Page</div>} />
        <Route exact path="/login" component={LoginPage} />
      </Fragment>
    </MemoryRouter>,
  )
}

it('redirects to / when logged in', () => {
  localStorage.setItem(AUTH_TOKEN_KEY, 'fake_auth_token')
  localStorage.setItem(GITHUB_TOKEN_KEY, 'fake_github_token')

  const { queryByText } = renderRoutes()

  expect(queryByText('Example Page')).toBeInTheDOM()

  localStorage.clear()
})

it("doesn't redirect when logged out", () => {
  const { queryByText } = renderRoutes()

  expect(queryByText('Example Page')).not.toBeInTheDOM()
})

it('sets window.location correctly after login button is clicked')
