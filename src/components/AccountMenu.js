import { gql } from 'apollo-boost'
import { func, shape } from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import styled from 'react-emotion'
import { withRouter } from 'react-router-dom'
import { colors, fontSizes, lineHeights } from '../theme'
import { logOut } from '../utils/auth'
import { toAlpha } from '../utils/style'
import AvatarButton from './AvatarButton'
import Dropdown, { MenuDivider, MenuItem } from './Dropdown'
import Flex from './Flex'

const ME_QUERY = gql`
  query MeQuery {
    me {
      name
      login
      avatarUrl
    }
  }
`

const textStyle = {
  textAlign: 'left',
  lineHeight: lineHeights.normal,
  whiteSpace: 'nowrap',
}

const Name = styled.span(textStyle, {
  fontSize: fontSizes[2],
  color: colors.white,
})

const Login = styled.span(textStyle, {
  fontSize: fontSizes[1],
  color: toAlpha(colors.gray[6], colors.black),
})

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
              <Name>{data.me.name}</Name>
              <Login>{data.me.login}</Login>
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
