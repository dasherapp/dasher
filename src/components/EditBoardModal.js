import React from 'react'
import { func, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'

import { BOARDS_QUERY } from './Boards'

const CREATE_BOARD_MUTATION = gql`
  mutation CreateBoardMutation($name: String!) {
    createBoard(name: $name) {
      id
      name
    }
  }
`
const UPDATE_BOARD_MUTATION = gql`
  mutation UpdateBoardMutation($boardId: ID!, $name: String) {
    updateBoard(id: $boardId, name: $name) {
      id
      name
    }
  }
`

class EditBoardModal extends React.Component {
  static propTypes = {
    closeModal: func.isRequired,
    boardId: string,
  }

  static defaultProps = {
    boardId: '',
  }

  state = { name: '' }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    const { closeModal, boardId } = this.props
    const { name } = this.state

    return (
      <Mutation
        mutation={CREATE_BOARD_MUTATION}
        update={(cache, { data }) => {
          const { boards } = cache.readQuery({ query: BOARDS_QUERY })
          cache.writeQuery({
            query: BOARDS_QUERY,
            data: { boards: boards.concat([data.createBoard]) },
          })
        }}
      >
        {createBoard => (
          <Mutation mutation={UPDATE_BOARD_MUTATION}>
            {updateBoard => (
              <Modal isOpen onRequestClose={closeModal}>
                <form
                  id="edit-board"
                  onSubmit={event => {
                    event.preventDefault()

                    if (boardId) {
                      updateBoard({ variables: { boardId, name } })
                    } else {
                      createBoard({ variables: { name } })
                    }

                    closeModal()
                  }}
                >
                  <label>
                    Name
                    <div>
                      <input
                        value={name}
                        onChange={this.handleNameChange}
                        required
                      />
                    </div>
                  </label>
                </form>
                <button type="submit" form="edit-board">
                  {boardId ? 'Save' : 'Create'}
                </button>
                <button onClick={closeModal}>Cancel</button>
              </Modal>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default EditBoardModal
