import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

const BOARDS_QUERY = gql`
  query BoardsQuery {
    boards {
      id
      name
    }
  }
`

function Boards() {
  return (
    <Query query={BOARDS_QUERY}>
      {({ data: { boards }, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>

        return (
          <ul>
            {boards.map(board => (
              <li>
                <Link to={`/board/${board.id}`}>{board.name}</Link>
              </li>
            ))}
          </ul>
        )
      }}
    </Query>
  )
}

export default Boards
