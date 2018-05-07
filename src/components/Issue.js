import React from 'react'
import glamorous, { Div, Small } from 'glamorous'

import { spacing, fontSizes, fontWeights, lineHeights, colors } from '../theme'
import { joinSpacing } from '../utils/style'
import {
  IssueIcon,
  PullRequestIcon,
  MergeIcon,
  CheckIcon,
  XIcon,
  SmallCircleIcon,
} from './Icon'
import Flex from './Flex'

const IssueTitle = glamorous.a({
  fontSize: fontSizes[1],
  fontWeight: fontWeights.bold,
  lineHeight: lineHeights.normal,
  color: colors.gray[8],
  textDecoration: 'none',

  ':hover': {
    color: colors.indigo[8],
  },
})

function renderStateIcon(issue) {
  if (issue.merged) {
    return <MergeIcon color={colors.violet[8]} size={20} />
  }

  if (issue.mergeable) {
    return (
      <PullRequestIcon
        color={issue.closed ? colors.red[8] : colors.green[8]}
        size={20}
      />
    )
  }

  return (
    <IssueIcon
      color={issue.closed ? colors.red[8] : colors.green[8]}
      size={20}
    />
  )
}

function renderStatusIcon(issue) {
  const buildStatus =
    issue.commits &&
    issue.commits.commits[0].commit &&
    issue.commits.commits[0].commit.status &&
    issue.commits.commits[0].commit.status.state

  if (buildStatus === 'SUCCESS') {
    return <CheckIcon color={colors.green[8]} size={16} />
  }

  if (buildStatus === 'PENDING') {
    return <SmallCircleIcon color={colors.yellow[8]} size={16} />
  }

  if (buildStatus === 'FAILURE') {
    return <XIcon color={colors.red[8]} size={16} />
  }
}

function Issue({ issue }) {
  return (
    <Flex
      padding={joinSpacing(spacing[3], spacing[4], spacing[3], spacing[3])}
      borderTop={`1px solid ${colors.gray[2]}`}
    >
      <Flex flexDirection="column" alignItems="center" marginRight={spacing[3]}>
        {renderStateIcon(issue)}
        <Div marginTop={spacing[1]} />
        {renderStatusIcon(issue)}
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start">
        <IssueTitle href={issue.url} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </IssueTitle>
        <Small
          marginTop={spacing[0]}
          fontSize={fontSizes[0]}
          lineHeight={lineHeights.normal}
          color={colors.gray[6]}
        >
          #{issue.number}
          {issue.closed ? '' : ' opened'}
          {issue.author &&
            ` by
          ${issue.author.login}`}
        </Small>
      </Flex>
    </Flex>
  )
}

export default Issue
