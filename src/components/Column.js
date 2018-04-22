import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import glamorous from 'glamorous'

import { spacing, colors, radii, shadows } from '../theme'
import ColumnForm from './ColumnForm'
import Button from './Button'

const UPDATE_COLUMN_MUTATION = gql`
  mutation UpdateColumnMutation($id: ID!, $name: String, $query: String) {
    updateColumn(id: $id, name: $name, query: $query) {
      id
      index
      name
      query
    }
  }
`

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
    isEditing: this.props.column.name ? false : true,
  }

  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing })

  render() {
    const { column } = this.props
    const { isEditing } = this.state
    return (
      <Mutation mutation={UPDATE_COLUMN_MUTATION}>
        {updateColumn => (
          <ColumnContainer>
            <strong>{column.name || 'Untitled Column'}</strong>
            <Button kind="secondary" onClick={this.toggleEdit}>
              Edit column
            </Button>
            {isEditing && (
              <ColumnForm
                initialState={{ name: column.name, query: column.query }}
                onSubmit={(event, { name, query }) => {
                  event.preventDefault()
                  updateColumn({ variables: { id: column.id, name, query } })
                  this.toggleEdit()
                }}
                onCancel={this.toggleEdit}
              />
            )}
          </ColumnContainer>
        )}
      </Mutation>
    )
  }
}

export default Column
