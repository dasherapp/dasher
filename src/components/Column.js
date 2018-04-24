import React, { Component, Fragment } from 'react'
import { shape, string, object, bool, func } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import glamorous from 'glamorous'

import { BOARD_QUERY } from './BoardPage'
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

const DELETE_COLUMN_MUTATION = gql`
  mutation DeleteColumnMutation($id: ID!) {
    deleteColumn(id: $id) {
      id
    }
  }
`

const ColumnContainer = glamorous.div(({ isDragging, draggableStyle }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 360,
  marginRight: spacing[3],
  padding: spacing[3],
  backgroundColor: colors.white,
  borderRadius: radii[1],
  boxShadow: isDragging ? shadows[3] : shadows[1],

  // styles we need to apply on draggables
  ...draggableStyle,
}))

class Column extends Component {
  static propTypes = {
    boardId: string.isRequired,
    column: shape({
      name: string.isRequired,
      query: string.isRequired,
    }).isRequired,
    isDragging: bool.isRequired,
    draggableStyle: object.isRequired,
    innerRef: func.isRequired,
  }

  state = {
    name: this.props.column.name,
    query: this.props.column.query,
    isEditing: this.props.column.name ? false : true,
  }

  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing })

  render() {
    const { boardId, column, ...props } = this.props
    const { isEditing, name, query } = this.state
    return (
      <Mutation mutation={UPDATE_COLUMN_MUTATION}>
        {updateColumn => (
          <Mutation
            mutation={DELETE_COLUMN_MUTATION}
            update={(cache, { data }) => {
              const { board } = cache.readQuery({
                query: BOARD_QUERY,
                variables: { id: boardId },
              })
              cache.writeQuery({
                query: BOARD_QUERY,
                variables: { id: boardId },
                data: {
                  board: {
                    ...board,
                    columns: board.columns.filter(
                      column => column.id !== data.deleteColumn.id,
                    ),
                  },
                },
              })
            }}
          >
            {deleteColumn => (
              <ColumnContainer {...props}>
                <strong>{name || 'Untitled Column'}</strong>
                {column.name && (
                  <Fragment>
                    <Button kind="secondary" onClick={this.toggleEdit}>
                      Edit column
                    </Button>
                    <Button
                      kind="secondary"
                      onClick={() =>
                        // TODO: open a delete confirmation modal
                        deleteColumn({ variables: { id: column.id } })
                      }
                    >
                      Delete column
                    </Button>
                  </Fragment>
                )}
                {isEditing && (
                  <ColumnForm
                    formState={{ name, query }}
                    onChange={change => this.setState(change)}
                    onSubmit={event => {
                      event.preventDefault()
                      updateColumn({
                        variables: { id: column.id, name, query },
                      })
                      this.toggleEdit()
                    }}
                    onCancel={() => {
                      if (column.name) {
                        this.setState({
                          name: column.name,
                          query: column.query,
                        })
                        this.toggleEdit()
                      } else {
                        deleteColumn({ variables: { id: column.id } })
                      }
                    }}
                  />
                )}
              </ColumnContainer>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default Column
