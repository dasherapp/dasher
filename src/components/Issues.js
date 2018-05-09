import React, { Component } from 'react'
import { string } from 'prop-types'

import Button from './Button'
import { searchIssues } from '../utils/github'
import Issue from './Issue'

class Issues extends Component {
  static propTypes = {
    query: string,
  }

  static defaultProps = {
    query: '',
  }

  state = {
    issues: [],
    hasNextPage: false,
    endCursor: null,
  }

  componentDidMount() {
    this.applySearch(this.props.query)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      const delay = 500

      clearTimeout(this.setTimeoutId)

      this.setTimeoutId = setTimeout(() => {
        this.applySearch(this.props.query)
      }, delay)
    }
  }

  applySearch = query => {
    searchIssues({ query }).then(data => {
      if (data.errors) {
        data.errors.forEach(error => console.error(error.message))
        return
      }

      const { issues, pageInfo } = data.data.search

      this.setState({
        issues,
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

      const { issues, pageInfo } = data.data.search

      this.setState({
        issues: [...this.state.issues, ...issues],
        hasNextPage: pageInfo.hasNextPage,
        endCursor: pageInfo.endCursor,
      })
    })
  }

  render() {
    const { query } = this.props
    const { issues, hasNextPage, endCursor } = this.state

    return (
      <div>
        <div>{issues.map(issue => <Issue key={issue.id} issue={issue} />)}</div>
        {hasNextPage && (
          <Button onClick={() => this.loadMore(query, endCursor)}>
            Load more
          </Button>
        )}
      </div>
    )
  }
}

export default Issues
