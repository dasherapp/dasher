import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import glamorous from 'glamorous'

import { spacing, colors, radii, shadows } from '../theme'
import ColumnForm from './ColumnForm'
import Button from './Button'

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

  toggleEditing = () => this.setState({ isEditing: !this.state.isEditing })

  render() {
    const { column } = this.props
    const { isEditing } = this.state
    return (
      <ColumnContainer>
        <strong>{column.name || 'Untitled Column'}</strong>
        <Button kind="secondary" onClick={this.toggleEditing}>
          Edit column
        </Button>
        {isEditing && (
          <ColumnForm
            initialState={{ name: column.name, query: column.query }}
            onSubmit={(event, state) => {
              event.preventDefault()
              console.log(state)
            }}
            onCancel={this.toggleEditing}
          />
        )}
      </ColumnContainer>
    )
  }
}

export default Column
