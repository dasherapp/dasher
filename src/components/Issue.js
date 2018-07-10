import React from 'react'
import { space } from '../theme'
import { get } from '../utils/utils'
import Avatar from './Avatar'
import Flex from './Flex'
import Heading from './Heading'
import {
  CheckIcon,
  IssueIcon,
  MergeIcon,
  PullRequestIcon,
  SmallCircleIcon,
  XIcon,
} from './Icon'
import IssueLabels from './IssueLabels'
import Link from './Link'
import Text from './Text'

function renderStateIcon(issue) {
  if (issue.merged) {
    return <MergeIcon color="violet.8" size={20} />
  }

  if (issue.mergeable) {
    return (
      <PullRequestIcon color={issue.closed ? 'red.8' : 'green.8'} size={20} />
    )
  }

  return <IssueIcon color={issue.closed ? 'red.8' : 'green.8'} size={20} />
}

function renderStatusIcon(issue) {
  const buildStatus = get(
    ['commits', 'commits', 0, 'commit', 'status', 'state'],
    issue,
  )

  switch (buildStatus) {
    case 'SUCCESS':
      return <CheckIcon color="green.8" size={16} />

    case 'PENDING':
      return <SmallCircleIcon color="yellow.8" size={16} />

    case 'FAILURE':
      return <XIcon color="red.8" size={16} />

    default:
      return null
  }
}

function Issue({ issue }) {
  return (
    <Flex p={4} pr={5} borderTop="1px solid" borderColor="grayAlpha.2">
      <Flex flexDirection="column" alignItems="center" mr={4}>
        {renderStateIcon(issue)}
        <div css={{ marginTop: space[2] }} />
        {renderStatusIcon(issue)}
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start">
        <Heading
          is={Link}
          fontSize={1}
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {issue.title}
        </Heading>
        <Text is="small" mt={1} fontSize={0} lineHeight="normal" color="gray.6">
          #{issue.number}
          {issue.closed ? '' : ' opened'}
          {issue.author &&
            ` by
          ${issue.author.login}`}
        </Text>
        <IssueLabels
          labels={issue.labels.labels}
          totalCount={issue.labels.totalCount}
        />
        {issue.assignees.totalCount > 0 && (
          <Flex flexWrap="wrap" mt={2}>
            {issue.assignees.assignees.map(assignee => (
              <Flex alignItems="center">
                <a href={assignee.url}>
                  <Avatar src={assignee.avatarUrl} m={1} ml={0} />
                </a>
                {issue.assignees.totalCount === 1 && (
                  <Text
                    is="small"
                    pl={2}
                    fontSize={0}
                    lineHeight="tight"
                    color="gray.6"
                  >
                    Assigned to{' '}
                    <Link href={assignee.url}>{assignee.login}</Link>
                  </Text>
                )}
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default Issue
