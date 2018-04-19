import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'

import ModalContainer from '../containers/ModalContainer'
import EditBoardModal from './EditBoardModal'

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
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <div>
          <h1>Boards</h1>
          <button onClick={() => modal.showModal(EditBoardModal)}>
            Create board
          </button>
          <Query query={BOARDS_QUERY}>
            {({ data: { boards }, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error</div>

              return (
                <ul>
                  {boards.map(board => (
                    <li key={board.id}>
                      <div>
                        <Link to={`/board/${board.id}`}>{board.name}</Link>
                        <button
                          onClick={() =>
                            modal.showModal(EditBoardModal, {
                              boardId: board.id,
                            })
                          }
                        >
                          Edit board
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
