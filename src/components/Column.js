import { gql } from 'apollo-boost'
import { bool, func, object, shape, string } from 'prop-types'
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import {
  colors,
  radii,
  shadows,
  spacing,
  transition,
  fontWeights,
} from '../theme'
import { BOARD_QUERY } from './BoardPage'
import Button from './Button'
import ColumnForm from './ColumnForm'
import DeleteColumnModal from './DeleteColumnModal'
import Dropdown, { MenuItem } from './Dropdown'
import Flex from './Flex'
import { EllipsesIcon } from './Icon'
import Issues from './Issues'
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

export const COLUMN_WIDTH = 330

const ColumnContainer = styled.div(props => ({
  display: 'flex',
  flexDirection: 'column',
  width: COLUMN_WIDTH,
  maxHeight: '100%',
  marginRight: spacing[3],
  backgroundColor: colors.white,
  borderRadius: radii[1],
  boxShadow: props.isDragging ? shadows[3] : shadows[1],
  transition: `box-shadow ${transition.duration} ${transition.easing}`,
}))

class Column extends Component {
  static propTypes = {
    boardId: string.isRequired,
    column: shape({
      name: string.isRequired,
      query: string.isRequired,
    }).isRequired,
    isDragging: bool.isRequired,
    innerRef: func.isRequired,
    dragHandleProps: object.isRequired,
  }

  state = {
    name: this.props.column.name,
    query: this.props.column.query,
    isEditing: this.props.column.name ? false : true,
  }

  toggleEdit = () => this.setState(state => ({ isEditing: !state.isEditing }))

  render() {
    const { boardId, column, dragHandleProps, ...props } = this.props
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
                <Subscribe to={[ModalContainer]}>
                  {modal => (
                    <Flex
                      css={{
                        alignItems: 'center',
                        flex: '0 0 auto',
                        padding: spacing[1],
                        paddingLeft: spacing[3],
                      }}
                      {...dragHandleProps}
                    >
                      <span
                        css={{
                          fontWeight: fontWeights.bold,
                          color: colors.gray[8],
                        }}
                      >
                        {name || 'Untitled Column'}
                      </span>
                      <Spacer />
                      {column.name && (
                        <Dropdown
                          renderMenuButton={({ getMenuButtonProps }) => (
                            <Button
                              {...getMenuButtonProps({
                                refKey: 'innerRef',
                                buttonStyle: 'icon',
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
