import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import glamorous from 'glamorous'

import { spacing, colors, radii, shadows } from '../theme'
import ColumnForm from './ColumnForm'

const ColumnContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  width: 360,
  marginRight: spacing[3],
  padding: spacing[3],
  backgroundColor: colors.white,
  borderRadius: radii[1],
  boxShadow: shadows[1],
})

class Column extends Component {
  static propTypes = {
    column: shape({
      name: string.isRequired,
      query: string.isRequired,
    }).isRequired,
  }

  state = {
    isEditing: false,
  }

  render() {
    const { column } = this.props

    return (
      <ColumnContainer>
        <strong>{column.name || 'Untitled Column'}</strong>
        <ColumnForm
          initialState={{ name: column.name, query: column.query }}
          onSubmit={(event, state) => {
            event.preventDefault()
            console.log(state)
          }}
        />
      </ColumnContainer>
    )
  }
}

export default Column
