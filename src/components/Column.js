import React, { Component, Fragment } from 'react'
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
import { searchIssues } from '../utils/github'
import Issue from './Issue'

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

  componentDidMount() {
    this.applySearch(this.state.query)
  }

  applySearch = query => {
    searchIssues({ query }).then(data => {
      if (data.errors) {
        data.errors.forEach(error => console.error(error.message))
        return
      }

      const { issues, issueCount, pageInfo } = data.data.search

      this.setState({
        issues,
        issueCount,
        hasNextPage: pageInfo.hasNextPage,
        endCursor: pageInfo.endCursor,
      })
    })
  }

  loadMore = (query, endCursor) => {
    searchIssues({ query, endCursor }).then(data => {
      if (data.errors) {
        data.errors.forEach(error => console.error(error.message))
        return
      }

      const { issues, issueCount, pageInfo } = data.data.search

      this.setState({
        issues: [...this.state.issues, ...issues],
        issueCount,
        hasNextPage: pageInfo.hasNextPage,
        endCursor: pageInfo.endCursor,
      })
    })
  }

  handleQueryChange = query => {
    const delay = 500

    clearTimeout(this.setTimeoutId)

    this.setTimeoutId = setTimeout(() => {
      this.applySearch(query)
    }, delay)
  }

  toggleEdit = () => this.setState({ isEditing: !this.state.isEditing })

  render() {
    const { boardId, column } = this.props
    const {
      isEditing,
      name,
      query,
      issues,
      issueCount,
      hasNextPage,
      endCursor,
    } = this.state
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
                <strong>{name || 'Untitled Column'}</strong>
                {column.name && (
                  <Fragment>
                    <Button kind="secondary" onClick={this.toggleEdit}>
                      Edit column
                    </Button>
                    <Subscribe to={[ModalContainer]}>
                      {modal => (
                        <Button
                          kind="danger"
                          onClick={() =>
                            modal.openModal(DeleteColumnModal, {
                              boardId,
                              column,
                            })
                          }
                        >
                          Delete column
                        </Button>
                      )}
                    </Subscribe>
                  </Fragment>
                )}
                {isEditing && (
                  <ColumnForm
                    formState={{ name, query }}
                    onChange={change => {
                      this.setState(change, () => {
                        if ('query' in change) {
                          this.handleQueryChange(change.query)
                        }
                      })
                    }}
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
                <div>
                  {issues &&
                    issues.map(issue => <Issue key={issue.id} issue={issue} />)}
                </div>
                {hasNextPage && (
                  <Button onClick={() => this.loadMore(query, endCursor)}>
                    Load more
                  </Button>
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
