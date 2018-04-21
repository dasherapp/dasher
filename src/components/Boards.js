import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Subscribe } from 'unstated'

import { spacing } from '../theme'
import ModalContainer from '../containers/ModalContainer'
import CreateBoardModal from './CreateBoardModal'
import BoardCard from './BoardCard'
import Grid from './Grid'

export const BOARDS_QUERY = gql`
  query BoardsQuery {
    boards {
      id
      name
    }
  }
`

function Boards() {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <div>
          <h1>Boards</h1>
          <button onClick={() => modal.openModal(CreateBoardModal)}>
            Create board
          </button>
          <Query query={BOARDS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error</div>

              return (
                <Grid width={300} gap={spacing[3]}>
                  {data.boards.map(board => (
                    <BoardCard key={board.id} board={board} />
                  ))}
                </Grid>
              )
            }}
          </Query>
        </div>
      )}
    </Subscribe>
  )
}

export default Boards
