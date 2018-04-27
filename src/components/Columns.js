import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import glamorous from 'glamorous'

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

const HorizontalScroll = glamorous.div({
  display: 'flex',
  overflowX: 'auto',
})

const ColumnsContainer = glamorous.div({
  display: 'flex',
  alignItems: 'flex-start',
  padding: spacing[3],
})

function Columns({ boardId, columns }) {
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
          <ColumnsContainer>
            {columns.map(column => (
              <Column key={column.id} boardId={boardId} column={column} />
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
        </HorizontalScroll>
      )}
    </Mutation>
  )
}

Columns.propTypes = {
  boardId: string.isRequired,
  columns: arrayOf(
    shape({
      id: string.isRequired,
    }),
  ).isRequired,
}

export default Columns
