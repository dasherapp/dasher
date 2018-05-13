import React from 'react'
import { Redirect } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'
import { getGithubAuthUrl } from '../utils/github'
import Button from './Button'

function goToGithubAuthPage() {
  window.location = getGithubAuthUrl(window.location)
}

function LoginPage() {
  return isLoggedIn() ? (
    <Redirect to="/" />
  ) : (
    <div>
      <h1>Login Page</h1>
      <Button onClick={goToGithubAuthPage}>Continue with GitHub</Button>
    </div>
  )
}

export default LoginPage
