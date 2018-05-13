import { gql } from 'apollo-boost'
import { func, shape, string } from 'prop-types'
import React, { Fragment } from 'react'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'
import { BOARD_QUERY } from './BoardPage'
import Button from './Button'

const DELETE_COLUMN_MUTATION = gql`
  mutation DeleteColumnMutation($id: ID!) {
    deleteColumn(id: $id) {
      id
    }
  }
`

function DeleteColumnModal({ boardId, column, closeModal }) {
  return (
    <Mutation
      mutation={DELETE_COLUMN_MUTATION}
      update={(cache, { data }) => {
        const { board } = cache.readQuery({
          query: BOARD_QUERY,
          variables: { id: boardId },
        })
        cache.writeQuery({
          query: BOARD_QUERY,
          data: {
            board: {
              ...board,
              columns: board.columns.filter(
                column => column.id !== data.deleteColumn.id,
              ),
            },
          },
        })
      }}
    >
      {deleteColumn => (
        <Modal isOpen onRequestClose={closeModal}>
          <Fragment>
            <h1>Delete column</h1>
            <p>
              Are you sure you want to delete <strong>{column.name}</strong>?
              This action cannot be undone.
            </p>
            <Button buttonStyle="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              buttonStyle="danger"
              onClick={() => {
                deleteColumn({ variables: { id: column.id } })
                closeModal()
              }}
            >
              Delete
            </Button>
          </Fragment>
        </Modal>
      )}
    </Mutation>
  )
}

DeleteColumnModal.propTypes = {
  boardId: string.isRequired,
  column: shape({
    name: string.isRequired,
    id: string.isRequired,
  }).isRequired,
  closeModal: func.isRequired,
}

export default DeleteColumnModal
