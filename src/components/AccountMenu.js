import React from 'react'
import { shape, func } from 'prop-types'
import styled from 'react-emotion'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { fontSizes, colors, spacing, lineHeights } from '../theme'
import { toAlpha, joinSpacing } from '../utils/style'
import { logOut } from '../utils/auth'
import AvatarButton from './AvatarButton'
import Dropdown, { MenuItem, MenuDivider } from './Dropdown'
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
            offsetTop={spacing[1]}
            renderMenuButton={({ getMenuButtonProps }) => (
              <AvatarButton
                {...getMenuButtonProps({
                  src: data.me.avatarUrl,
                  alt: data.me.login,
                })}
              />
            )}
          >
            <Flex
              flexDirection="column"
              padding={joinSpacing(spacing[1], spacing[3])}
            >
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
