import React, { Component } from 'react'
import { string, shape, func } from 'prop-types'

import Button from './Button'

class ColumnForm extends Component {
  static propTypes = {
    initialState: shape({ name: string }),
    onSubmit: func,
    onCancel: func,
  }

  static defaultProps = {
    initialState: { name: '', query: '' },
    onSubmit: () => {},
    onCancel: () => {},
  }

  state = this.props.initialState

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  handleQueryChange = event => {
    this.setState({ query: event.target.value })
  }

  render() {
    const { onSubmit, onCancel } = this.props
    const { name, query } = this.state
    return (
      <form onSubmit={event => onSubmit(event, this.state)}>
        <div>
          <label>
            Name
            <input
              value={name}
              onChange={this.handleNameChange}
              required
              autoFocus
            />
          </label>
        </div>
        <div>
          <label>
            Query
            <input value={query} onChange={this.handleQueryChange} required />
          </label>
        </div>
        <div>
          <Button type="button" kind="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    )
  }
}

export default ColumnForm
