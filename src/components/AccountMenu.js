import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { logOut } from '../utils/auth'

const ME_QUERY = gql`
  query MeQuery {
    me {
      name
      login
      avatarUrl
    }
  }
`

function AccountMenu({ history }) {
  return (
    <Query query={ME_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>

        const { name, login, avatarUrl } = data.me

        return (
          <details>
            <summary>
              <img src={avatarUrl} width="32" alt={login} />
            </summary>

            <p>{name}</p>
            <p>{login}</p>
            <button
              onClick={() => {
                logOut()
                history.push('/login')
              }}
            >
              Log out
            </button>
          </details>
        )
      }}
    </Query>
  )
}

export default withRouter(AccountMenu)
