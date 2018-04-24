import React, { Component } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { arrayOf, shape, string } from 'prop-types'
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

const HorizontalScroll = glamorous.div({
  display: 'flex',
  overflowX: 'auto',
})

const ColumnsContainer = glamorous.div({
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
      }),
    ).isRequired,
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
        )}
      </Mutation>
    )
  }
}

export default Columns
