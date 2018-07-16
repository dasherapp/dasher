import { gql } from 'apollo-boost'
import { shape, string } from 'prop-types'
import React from 'react'
import { Query } from 'react-apollo'
import BoardHeader from './BoardHeader'
import Columns from './Columns'
import Flex from './Flex'
import NotFoundPage from './NotFoundPage'

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
          <Flex flexDirection="column" height="100vh">
            <BoardHeader board={data.board} />
            <Columns boardId={data.board.id} columns={data.board.columns} />
          </Flex>
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
