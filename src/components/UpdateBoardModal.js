import React from 'react'
import { func, string, shape } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'

import Button from './Button'
import BoardForm from './BoardForm'

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
          <Button kind="secondary" onClick={closeModal}>
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
