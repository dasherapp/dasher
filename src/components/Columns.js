import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import glamorous from 'glamorous'

import { spacing } from '../theme'
import Column from './Column'

const ColumnsContainer = glamorous.div({
  display: 'flex',
  padding: spacing[4],
  backgroundColor: 'papayawhip',
  overflowX: 'auto',
})

function Columns({ columns }) {
  return (
    <ColumnsContainer>
      {columns.map(column => <Column key={column.id} column={column} />)}
      <button>Add column</button>
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
