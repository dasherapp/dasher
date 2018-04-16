import { gql } from 'apollo-boost'

import { client } from '../components/Apollo'

export const AUTH_TOKEN_KEY = 'auth_token'

const AUTHENTICATE_MUTATION = gql`
  mutation AuthenticateMutation($githubCode: String!) {
    authenticate(githubCode: $githubCode) {
      token
    }
  }
`

export async function logIn(githubCode) {
  const { data } = await client.mutate({
    mutation: AUTHENTICATE_MUTATION,
    variables: { githubCode },
  })

  setAuthToken(data.authenticate.token)
}

export function logOut() {
  removeAuthToken()
}

export function isLoggedIn() {
  const authToken = getAuthToken()
  return Boolean(authToken)
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
