import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import glamorous from 'glamorous'

import { spacing } from '../theme'

const ColumnsContainer = glamorous.div({
  display: 'flex',
  padding: spacing[4],
  backgroundColor: 'papayawhip',
})

function Columns({ columns }) {
  return (
    <ColumnsContainer>
      {columns.map(column => (
        <div key={column.id}>{column.name || 'Untitled Column'}</div>
      ))}
    </ColumnsContainer>
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
