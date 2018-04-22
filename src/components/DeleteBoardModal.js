import React from 'react'
import { func, shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'

import Button from './Button'
import { BOARDS_QUERY } from './Boards'

const DELETE_BOARD_MUTATION = gql`
  mutation DeleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`
function DeleteBoardModal({ closeModal, board, history }) {
  return (
    <Mutation
      mutation={DELETE_BOARD_MUTATION}
      update={(cache, { data }) => {
        const { boards } = cache.readQuery({ query: BOARDS_QUERY })
        cache.writeQuery({
          query: BOARDS_QUERY,
          data: {
            boards: boards.filter(board => board.id !== data.deleteBoard.id),
          },
        })
      }}
    >
      {deleteBoard => (
        <Modal isOpen onRequestClose={closeModal}>
          <React.Fragment>
            <h1>Delete board</h1>
            <p>
              Are you sure you want to delete <strong>{board.name}</strong>?
              This action cannot be undone.
            </p>
            <Button kind="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              kind="danger"
              onClick={() => {
                deleteBoard({ variables: { id: board.id } })
                closeModal()
                history.push('/')
              }}
            >
              Delete
            </Button>
          </React.Fragment>
        </Modal>
      )}
    </Mutation>
  )
}

DeleteBoardModal.propTypes = {
  board: shape({
    id: string.isRequired,
  }).isRequired,
  closeModal: func.isRequired,
  history: shape({ push: func.isRequired }).isRequired,
}

export default withRouter(DeleteBoardModal)
