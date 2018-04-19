import React from 'react'
import { shape, func } from 'prop-types'
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

        return (
          <details>
            <summary>
              <img src={data.me.avatarUrl} width="32" alt={data.me.login} />
            </summary>

            <p>{data.me.name}</p>
            <p>{data.me.login}</p>
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

AccountMenu.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
}

export default withRouter(AccountMenu)
