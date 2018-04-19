import React from 'react'
import { func } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'

const CREATE_BOARD_MUTATION = gql`
  mutation CreateBoardMutation($name: String!) {
    createBoard(name: $name) {
      id
      name
    }
  }
`
class EditBoardModal extends React.Component {
  static propTypes = {
    hideModal: func.isRequired,
  }

  state = { name: '' }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    const { hideModal } = this.props
    const { name } = this.state

    return (
      <Mutation mutation={CREATE_BOARD_MUTATION}>
        {(createBoard, { data }) => (
          <Modal isOpen onRequestClose={hideModal}>
            <form
              id="edit-board"
              onSubmit={event => {
                event.preventDefault()
                createBoard({ variables: { name } })
                hideModal()
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
              Save
            </button>
            <button onClick={hideModal}>Cancel</button>
          </Modal>
        )}
      </Mutation>
    )
  }
}

export default EditBoardModal
