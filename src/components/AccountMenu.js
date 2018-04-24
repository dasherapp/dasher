import React from 'react'
import { shape, func } from 'prop-types'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { logOut } from '../utils/auth'
import Button from './Button'
import Avatar from './Avatar'
import Dropdown, { MenuItem } from './Dropdown'

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
          <Dropdown
            toggleComponent={props => (
              <Avatar
                src={data.me.avatarUrl}
                alt={data.me.login}
                size={32}
                shape="circle"
                {...props}
              />
            )}
          >
            <MenuItem
              onClick={() => {
                logOut()
                history.push('/login')
              }}
            >
              Log out
            </MenuItem>
          </Dropdown>
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
