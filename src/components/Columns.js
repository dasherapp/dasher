import React from 'react'
import { arrayOf, shape, string } from 'prop-types'

function Columns({ columns }) {
  return (
    <div>
      {columns.map(column => (
        <div key={column.id}>{column.name || 'Untitled Column'}</div>
      ))}
    </div>
  )
}

Columns.propTypes = {
  columns: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
    }),
  ).isRequired,
}

export default Columns
