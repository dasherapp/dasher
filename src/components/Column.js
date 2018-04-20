import React from 'react'
import { shape, string } from 'prop-types'
import glamorous from 'glamorous'

import { spacing, radii } from '../theme'

const ColumnContainer = glamorous.div({
  display: 'flex',
  flex: '0 0 auto',
  width: 360,
  marginRight: spacing[4],
  padding: spacing[4],
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
