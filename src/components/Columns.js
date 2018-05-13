import { gql } from 'apollo-boost'
import { arrayOf, number, shape, string } from 'prop-types'
import React, { Component } from 'react'
import { ApolloConsumer, Mutation } from 'react-apollo'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'react-emotion'
import { spacing } from '../theme'
import { reorder } from '../utils/utils'
import { BOARD_QUERY } from './BoardPage'
import Column, { COLUMN_WIDTH } from './Column'
import SkeletonButton from './SkeletonButton'

const CREATE_COLUMN_MUTATION = gql`
  mutation CreateColumnMutation(
    $boardId: ID!
    $index: Int!
    $name: String!
    $query: String!
  ) {
    createColumn(boardId: $boardId, index: $index, name: $name, query: $query) {
      id
      index
      name
      query
    }
  }
`
const UPDATE_COLUMN_MUTATION = gql`
  mutation UpdateColumnMutation($id: ID!, $index: Int) {
    updateColumn(id: $id, index: $index) {
      id
      index
    }
  }
`

const HorizontalScroll = styled.div({
  display: 'flex',
  overflowX: 'auto',
})

const ColumnsContainer = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  padding: spacing[3],
})

class Columns extends Component {
  static propTypes = {
    boardId: string.isRequired,
    columns: arrayOf(
      shape({
        id: string.isRequired,
        index: number.isRequired,
      }),
    ).isRequired,
  }

  onDragEnd = ({ source, destination }, cache, updateColumn) => {
    if (!destination) return

    const columns = reorder(
      this.props.columns,
      source.index,
      destination.index,
    ).map((column, index) => {
      updateColumn({ variables: { id: column.id, index } })
      return { ...column, index }
    })

    const { board } = cache.readQuery({
      query: BOARD_QUERY,
      variables: { id: this.props.boardId },
    })

    cache.writeQuery({
      query: BOARD_QUERY,
      variables: { id: this.props.boardId },
      data: { board: { ...board, columns } },
    })
  }

  render() {
    const { boardId, columns } = this.props

    return (
      <Mutation
        mutation={CREATE_COLUMN_MUTATION}
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
                columns: [...board.columns, data.createColumn],
              },
            },
          })
        }}
      >
        {createColumn => (
          <Mutation mutation={UPDATE_COLUMN_MUTATION}>
            {updateColumn => (
              <ApolloConsumer>
                {cache => (
                  <DragDropContext
                    onDragEnd={result =>
                      this.onDragEnd(result, cache, updateColumn)
                    }
                  >
                    <HorizontalScroll>
                      <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                          <ColumnsContainer
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {columns.map((column, index) => (
                              <Draggable
                                key={column.id}
                                draggableId={column.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <Column
                                    boardId={boardId}
                                    column={column}
                                    isDragging={snapshot.isDragging}
                                    innerRef={provided.innerRef}
                                    dragHandleProps={provided.dragHandleProps}
                                    {...provided.draggableProps}
                                  />
                                )}
                              </Draggable>
                            ))}
                            <SkeletonButton
                              width={COLUMN_WIDTH}
                              onClick={() =>
                                createColumn({
                                  variables: {
                                    boardId,
                                    index: columns.length,
                                    name: '',
                                    query: '',
                                  },
                                })
                              }
                            >
                              Add column
                            </SkeletonButton>
                          </ColumnsContainer>
                        )}
                      </Droppable>
                    </HorizontalScroll>
                  </DragDropContext>
                )}
              </ApolloConsumer>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default Columns
