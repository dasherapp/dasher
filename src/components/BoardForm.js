import React, { Component } from 'react'
import { string, shape, func } from 'prop-types'

class BoardForm extends Component {
  static propTypes = {
    id: string.isRequired,
    onSubmit: func.isRequired,
    initialState: shape({ name: string }),
  }

  static defaultProps = {
    initialState: { name: '' },
  }

  state = this.props.initialState

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    const { id, onSubmit } = this.props
    const { name } = this.state

    return (
      <form id={id} onSubmit={event => onSubmit(event, this.state)}>
        <label>
          Name
          <div>
            <input value={name} onChange={this.handleNameChange} required />
          </div>
        </label>
      </form>
    )
  }
}

export default BoardForm
