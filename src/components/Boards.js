import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import { Div } from 'glamorous'

import ModalContainer from '../containers/ModalContainer'
import UpdateBoardModal from './UpdateBoardModal'
import CreateBoardModal from './CreateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'
import Button from './Button'

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
          <Div
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <h1>Boards</h1>
            <Button onClick={() => modal.openModal(CreateBoardModal)}>
              Create board
            </Button>
          </Div>
          <Query query={BOARDS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error</div>

              return (
                <ul>
                  {data.boards.map(board => (
                    <li key={board.id}>
                      <div>
                        <Link to={`/board/${board.id}`}>{board.name}</Link>
                        <button
                          onClick={() =>
                            modal.openModal(UpdateBoardModal, {
                              board: board,
                            })
                          }
                        >
                          Edit board
                        </button>
                        <button
                          onClick={() =>
                            modal.openModal(DeleteBoardModal, {
                              board: board,
                            })
                          }
                        >
                          Delete board
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            }}
          </Query>
        </div>
      )}
    </Subscribe>
  )
}

export default Boards
