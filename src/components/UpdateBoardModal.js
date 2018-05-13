import { gql } from 'apollo-boost'
import { func, shape, string } from 'prop-types'
import React from 'react'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'
import BoardForm from './BoardForm'
import Button from './Button'

const UPDATE_BOARD_MUTATION = gql`
  mutation UpdateBoardMutation($boardId: ID!, $name: String) {
    updateBoard(id: $boardId, name: $name) {
      id
      name
    }
  }
`

function UpdateBoardModal({ closeModal, board }) {
  return (
    <Mutation mutation={UPDATE_BOARD_MUTATION}>
      {updateBoard => (
        <Modal isOpen onRequestClose={closeModal}>
          <BoardForm
            id="update-board"
            initialState={{ name: board.name }}
            onSubmit={(event, { name }) => {
              event.preventDefault()
              updateBoard({
                variables: { boardId: board.id, name },
              })
              closeModal()
            }}
          />
          <Button buttonStyle="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" form="update-board">
            Save
          </Button>
        </Modal>
      )}
    </Mutation>
  )
}

UpdateBoardModal.propTypes = {
  closeModal: func.isRequired,
  board: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
}

export default UpdateBoardModal
