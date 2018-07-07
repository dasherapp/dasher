import { gql } from 'apollo-boost'
import { func, shape } from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { logOut } from '../utils/auth'
import AvatarButton from './AvatarButton'
import Dropdown, { MenuDivider, MenuItem } from './Dropdown'
import Flex from './Flex'
import Text from './Text'

const ME_QUERY = gql`
  query MeQuery {
    me {
      name
      login
      avatarUrl
    }
  }
`

const MenuText = props => (
  <Text
    is="span"
    textAlign="left"
    lineHeight="normal"
    css={{ whiteSpace: 'nowrap' }}
    {...props}
  />
)

function AccountMenu({ history }) {
  return (
    <Query query={ME_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>

        return (
          <Dropdown
            minWidth={160}
            offsetTop={2}
            renderMenuButton={({ getMenuButtonProps }) => (
              <AvatarButton
                {...getMenuButtonProps({
                  src: data.me.avatarUrl,
                  alt: data.me.login,
                })}
              />
            )}
          >
            <Flex flexDirection="column" py={2} px={4}>
              <MenuText fontSize={2} color="white">
                {data.me.name}
              </MenuText>
              <MenuText fontSize={1} color="gray.5">
                {data.me.login}
              </MenuText>
            </Flex>
            <MenuDivider />
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
