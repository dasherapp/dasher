import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { arrayOf, shape, string, number } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import glamorous from 'glamorous'

import { BOARD_QUERY } from './BoardPage'
import { spacing } from '../theme'
import Column from './Column'
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

const reorderColumns = (columns, startingIndex, endingIndex, updateColumn) => {
  const [removed] = columns.splice(startingIndex, 1)
  columns.splice(endingIndex, 0, removed)

  columns.forEach((column, index) => {
    updateColumn({
      variables: { id: column.id, index },
    })
  })

  return columns
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

  state = { columns: this.props.columns }

  componentDidUpdate(prevProps) {
    const prevColumns = prevProps.columns
    const currColumns = this.props.columns
    let lengthChange = false
    let nameChange = false

    if (prevColumns.length !== currColumns.length) {
      lengthChange = true
    } else if (prevColumns !== currColumns) {
      let i
      for (i = 0; i < currColumns.length; i++) {
        if (prevColumns[i].name !== currColumns[i].name) {
          nameChange = true
        }
      }
    }

    if (nameChange || lengthChange) {
      this.setState({
        columns: currColumns,
      })
    }
  }

  onDragEnd = (result, updateColumn) => {
    if (!result.destination) {
      return
    }

    const columns = reorderColumns(
      [...this.state.columns],
      result.source.index,
      result.destination.index,
      updateColumn,
    )

    this.setState({
      columns,
    })
  }

  render() {
    const { boardId } = this.props
    const { columns } = this.state

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
              <DragDropContext
                onDragEnd={result => this.onDragEnd(result, updateColumn)}
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
                                draggableStyle={provided.draggableProps.style}
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              />
                            )}
                          </Draggable>
                        ))}
                        <SkeletonButton
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
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default Columns
