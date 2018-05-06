import React, { Component } from 'react'
import { arrayOf, shape, string, number } from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import glamorous from 'glamorous'
import { gql } from 'apollo-boost'
import { Mutation, ApolloConsumer } from 'react-apollo'

import { BOARD_QUERY } from './BoardPage'
import { spacing } from '../theme'
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

const HorizontalScroll = glamorous.div({
  display: 'flex',
  overflowX: 'auto',
})

const ColumnsContainer = glamorous.div({
  display: 'flex',
  alignItems: 'flex-start',
  padding: spacing[3],
})


function arrayMove(array, from, to) {
  const arrayCopy = [...array]
  const [removed] = arrayCopy.splice(from, 1)
  arrayCopy.splice(to, 0, removed)
  return arrayCopy
}

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

    const columns = arrayMove(
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
                                    draggableStyle={
                                      provided.draggableProps.style
                                    }
                                    innerRef={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
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
