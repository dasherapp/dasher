import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import glamorous from 'glamorous'
import { Subscribe } from 'unstated'

import ModalContainer from '../containers/ModalContainer'
import DeleteColumnModal from './DeleteColumnModal'
import { BOARD_QUERY } from './BoardPage'
import { spacing, colors, radii, shadows } from '../theme'
import ColumnForm from './ColumnForm'
import Button from './Button'
import Issues from './Issues'
import Dropdown, { MenuItem } from './Dropdown'
import { EllipsesIcon } from './Icon'
import Flex from './Flex'
import Spacer from './Spacer'

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

export const COLUMN_WIDTH = 360

const ColumnContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  width: COLUMN_WIDTH,
  marginRight: spacing[3],
  backgroundColor: colors.white,
  borderRadius: radii[1],
  boxShadow: shadows[1],
})

class Column extends Component {
  static propTypes = {
    boardId: string.isRequired,
    column: shape({
      name: string.isRequired,
      query: string.isRequired,
    }).isRequired,
  }

  state = {
    name: this.props.column.name,
    query: this.props.column.query,
    isEditing: this.props.column.name ? false : true,
  }

  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing })

  render() {
    const { boardId, column } = this.props
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
              <ColumnContainer>
                <Subscribe to={[ModalContainer]}>
                  {modal => (
                    <Flex alignItems="center">
                      <strong>{name || 'Untitled Column'}</strong>
                      <Spacer />
                      {column.name && (
                        <Dropdown
                          renderMenuButton={({ getMenuButtonProps }) => (
                            <Button
                              {...getMenuButtonProps({
                                refKey: 'innerRef',
                                kind: 'icon',
                              })}
                            >
                              <EllipsesIcon />
                            </Button>
                          )}
                        >
                          <MenuItem onClick={this.toggleEdit}>
                            Edit column
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              modal.openModal(DeleteColumnModal, {
                                boardId,
                                column,
                              })
                            }
                          >
                            Delete column
                          </MenuItem>
                        </Dropdown>
                      )}
                    </Flex>
                  )}
                </Subscribe>
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
                <Issues query={query} />
              </ColumnContainer>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default Column
