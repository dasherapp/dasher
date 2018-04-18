import React from 'react'
import { shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import NotFoundPage from './NotFoundPage'
import AccountMenu from './AccountMenu'

const BOARD_QUERY = gql`
  query BoardQuery($id: ID!) {
    board(id: $id) {
      name
    }
  }
`

function BoardPage({ match }) {
  return (
    <Query query={BOARD_QUERY} variables={{ id: match.params.id }}>
      {({ data: { board }, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>
        if (!board) return <NotFoundPage />

        return (
          <div>
            <AccountMenu />
            <h1>{board.name}</h1>
          </div>
        )
      }}
    </Query>
  )
}

BoardPage.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequried,
  }).isRequried,
}

export default BoardPage
