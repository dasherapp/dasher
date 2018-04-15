import { gql } from 'apollo-boost'

import { client } from '../components/Apollo'

const AUTH_TOKEN_KEY = 'auth_token'

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

  localStorage.setItem(AUTH_TOKEN_KEY, data.authenticate.token)
}

export function isLoggedIn() {
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
  return Boolean(authToken)
}
