import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { getAuthToken } from '../utils/auth'

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: operation => {
    const token = getAuthToken()
    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  },
})

function Apollo(props) {
  return <ApolloProvider client={client} {...props} />
}

export default Apollo
