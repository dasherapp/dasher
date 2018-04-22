import React from 'react'
import { string, shape, func } from 'prop-types'

import Button from './Button'

function ColumnForm({ formState, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Name
          <input
            value={formState.name}
            onChange={event => onChange({ name: event.target.value })}
            required
            autoFocus
          />
        </label>
      </div>
      <div>
        <label>
          Query
          <input
            value={formState.query}
            onChange={event => onChange({ query: event.target.value })}
            required
          />
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

ColumnForm.propTypes = {
  formState: shape({
    name: string.isRequired,
    query: string.isRequired,
  }).isRequired,
  onChange: func,
  onSubmit: func,
  onCancel: func,
}

ColumnForm.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  onCancel: () => {},
}

export default ColumnForm
