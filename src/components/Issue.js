import React from 'react'
import styled from 'react-emotion'
import { colors, fontSizes, fontWeights, lineHeights, space } from '../theme'
import { get } from '../utils/utils'
import Flex from './Flex'
import {
  CheckIcon,
  IssueIcon,
  MergeIcon,
  PullRequestIcon,
  SmallCircleIcon,
  XIcon,
} from './Icon'
import IssueLabels from './IssueLabels'
import Text from './Text'

const IssueTitle = styled.a({
  fontSize: fontSizes[1],
  fontWeight: fontWeights.bold,
  lineHeight: lineHeights.tight,
  color: colors.gray[8],
  textDecoration: 'none',

  ':hover': {
    color: colors.indigo[8],
  },
})

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
        <IssueTitle href={issue.url} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </IssueTitle>
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
      </Flex>
    </Flex>
  )
}

export default Issue
