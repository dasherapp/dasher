import React from 'react'
import { shape, string } from 'prop-types'
import glamorous from 'glamorous'

import { spacing, radii } from '../theme'

const ColumnContainer = glamorous.div({
  display: 'flex',
  width: 360,
  marginRight: spacing[3],
  padding: spacing[3],
  backgroundColor: 'white',
  borderRadius: radii[1],
})

function Column({ column }) {
  return (
    <ColumnContainer>
      <strong>{column.name || 'Untitled Column'}</strong>
    </ColumnContainer>
  )
}

Column.propTypes = {
  column: shape({
    name: string.isRequired,
  }).isRequired,
}

export default Column