import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import glamorous from 'glamorous'

import { spacing } from '../theme'
import Column from './Column'

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

const ColumnsContainer = glamorous.div({
  display: 'flex',
  alignItems: 'flex-start',
  padding: spacing[4],
  backgroundColor: 'papayawhip',
  overflowX: 'auto',
})

function Columns({ boardId, columns }) {
  return (
    <Mutation mutation={CREATE_COLUMN_MUTATION}>
      {createColumn => (
        <ColumnsContainer>
          {columns.map(column => <Column key={column.id} column={column} />)}
          <button
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
          </button>
        </ColumnsContainer>
      )}
    </Mutation>
  )
}

Columns.propTypes = {
  boardId: string.isRequired,
  columns: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
    }),
  ).isRequired,
}

export default Columns
