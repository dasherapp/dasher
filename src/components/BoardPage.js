import React from 'react'
import { shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import NotFoundPage from './NotFoundPage'
import BoardHeader from './BoardHeader'
import Columns from './Columns'

export const BOARD_QUERY = gql`
  query BoardQuery($id: ID!) {
    board(id: $id) {
      id
      name
      columns(orderBy: index_ASC) {
        id
        index
        name
        query
      }
    }
  }
`

function BoardPage({ match }) {
  return (
    <Query query={BOARD_QUERY} variables={{ id: match.params.id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>
        if (!data.board) return <NotFoundPage />

        return (
          <div>
            <BoardHeader board={data.board} />
            <Columns boardId={data.board.id} columns={data.board.columns} />
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
    }).isRequired,
  }).isRequired,
}

export default BoardPage
