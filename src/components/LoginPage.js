import React from 'react'
import { Redirect } from 'react-router-dom'

import { getGithubAuthUrl } from '../utils/github'
import { isLoggedIn } from '../utils/auth'

function goToGithubAuthPage() {
  window.location = getGithubAuthUrl(window.location)
}

function LoginPage() {
  return isLoggedIn() ? (
    <Redirect to="/" />
  ) : (
    <div>
      <h1>Login Page</h1>
      <button onClick={goToGithubAuthPage}>Continue with GitHub</button>
    </div>
  )
}

export default LoginPage
