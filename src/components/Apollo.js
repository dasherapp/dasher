import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({ uri: 'http://localhost:4000' })

function Apollo(props) {
  return <ApolloProvider client={client} {...props} />
}

export default Apollo
