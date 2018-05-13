import { gql } from 'apollo-boost'
import { func } from 'prop-types'
import React from 'react'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'
import { withRouter } from 'react-router-dom'
import BoardForm from './BoardForm'
import { BOARDS_QUERY } from './Boards'
import Button from './Button'

const CREATE_BOARD_MUTATION = gql`
  mutation CreateBoardMutation($name: String!) {
    createBoard(name: $name) {
      id
      name
    }
  }
`
function CreateBoardModal({ closeModal, history }) {
  return (
    <Mutation
      mutation={CREATE_BOARD_MUTATION}
      update={(cache, { data }) => {
        const { boards } = cache.readQuery({ query: BOARDS_QUERY })
        cache.writeQuery({
          query: BOARDS_QUERY,
          data: { boards: [...boards, data.createBoard] },
        })
      }}
    >
      {createBoard => (
        <Modal isOpen onRequestClose={closeModal}>
          <BoardForm
            id="create-board"
            onSubmit={async (event, { name }) => {
              event.preventDefault()
              const { data } = await createBoard({ variables: { name } })
              closeModal()
              history.push(`/board/${data.createBoard.id}`)
            }}
          />
          <Button buttonStyle="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" form="create-board">
            Create
          </Button>
        </Modal>
      )}
    </Mutation>
  )
}

CreateBoardModal.propTypes = {
  closeModal: func.isRequired,
}

export default withRouter(CreateBoardModal)
