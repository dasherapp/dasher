import { gql } from 'apollo-boost'

import { client } from '../components/Apollo'

export const AUTH_TOKEN_KEY = 'auth_token'
export const GITHUB_TOKEN_KEY = 'github_token'

const AUTHENTICATE_MUTATION = gql`
  mutation AuthenticateMutation($githubCode: String!) {
    authenticate(githubCode: $githubCode) {
      token
      githubToken
    }
  }
`

export async function logIn(githubCode) {
  const { data } = await client.mutate({
    mutation: AUTHENTICATE_MUTATION,
    variables: { githubCode },
  })

  setAuthToken(data.authenticate.token)
  setGithubToken(data.authenticate.githubToken)
}

export function logOut() {
  removeAuthToken()
  removeGithubToken()
}

export function isLoggedIn() {
  return Boolean(getAuthToken())
}

export function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function setGithubToken(githubToken) {
  localStorage.setItem(GITHUB_TOKEN_KEY, githubToken)
}

export function getGithubToken() {
  return localStorage.getItem(GITHUB_TOKEN_KEY)
}

export function removeGithubToken() {
  localStorage.removeItem(GITHUB_TOKEN_KEY)
}
