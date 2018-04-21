import React from 'react'
import { func, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'

const UPDATE_BOARD_MUTATION = gql`
  mutation UpdateBoardMutation($boardId: ID!, $name: String) {
    updateBoard(id: $boardId, name: $name) {
      id
      name
    }
  }
`

class UpdateBoardModal extends React.Component {
  static propTypes = {
    closeModal: func.isRequired,
    boardId: string.isRequired,
  }

  state = { name: '' }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    const { closeModal, boardId } = this.props
    const { name } = this.state

    return (
      <Mutation mutation={UPDATE_BOARD_MUTATION}>
        {updateBoard => (
          <Modal isOpen onRequestClose={closeModal}>
            <form
              id="update-board"
              onSubmit={event => {
                event.preventDefault()
                updateBoard({ variables: { boardId, name } })
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
            <button type="submit" form="update-board">
              Save
            </button>
            <button onClick={closeModal}>Cancel</button>
          </Modal>
        )}
      </Mutation>
    )
  }
}

export default UpdateBoardModal
