import axios from 'axios'
import qs from 'qs'

import { getGithubToken } from './auth'

const GITHUB_ENDPOINT = 'https://api.github.com/graphql'
const GITHUB_CLIENT_ID = '799bd70f09884c025750'

export function getGithubAuthUrl({ origin }) {
  const redirectUri = origin + '/callback'

  const queryString = qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    scope: 'repo',
    redirect_uri: redirectUri,
  })

  return `https://github.com/login/oauth/authorize?${queryString}`
}

export function searchIssues(variables) {
  const searchIssuesQuery = `
    query($query: String!, $endCursor: String) {
      search(query: $query, first: 10, type: ISSUE, after: $endCursor) {
        issueCount
        pageInfo {
          endCursor
          hasNextPage
        }
        issues: nodes {
          ... on Issue {
            id
            number
            repository {
              nameWithOwner
            }
            milestone {
              title
            }
            author {
              login
            }
            url
            title
            closedAt
            createdAt
            closed
            assignees(first: 5) {
              totalCount
              assignees: nodes {
                login
                avatarUrl
              }
            }
            labels(first: 5) {
              totalCount
              labels: nodes {
                name
                color
              }
            }
          }
          ... on PullRequest {
            id
            number
            repository {
              nameWithOwner
            }
            milestone {
              title
            }
            author {
              login
            }
            url
            title
            closedAt
            createdAt
            mergeable
            merged
            closed
            commits(last: 1) {
              commits: nodes {
                commit {
                  status {
                    state
                  }
                }
              }
            }
            assignees(first: 5) {
              totalCount
              assignees: nodes {
                login
                avatarUrl
              }
            }
            labels(first: 5) {
              totalCount
              labels: nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  `

  return axios
    .post(
      GITHUB_ENDPOINT,
      { query: searchIssuesQuery, variables },
      { headers: { Authorization: `bearer ${getGithubToken()}` } },
    )
    .then(response => response.data)
}
