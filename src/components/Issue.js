import React from 'react'
import glamorous, { Div, Small } from 'glamorous'
import { Link } from 'react-router-dom'

import { spacing, fontSizes, fontWeights, lineHeights, colors } from '../theme'
import {
  IssueIcon,
  PullRequestIcon,
  MergeIcon,
  CheckIcon,
  XIcon,
  SmallCircleIcon,
} from './Icon'

const IssueTitle = glamorous(Link)({
  fontSize: fontSizes[1],
  fontWeight: fontWeights.bold,
  lineHeight: lineHeights.tight,
  color: colors.gray[8],
  textDecoration: 'none',
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
    <Div
      display="flex"
      padding={spacing[4]}
      borderBottom={`1px solid ${colors.gray[2]}`}
    >
      <Div display="flex" flexDirection="column" alignItems="center">
        <Div marginRight={spacing[4]}>{renderStateIcon(issue)}</Div>
        <Div marginRight={spacing[4]} marginTop={spacing[1]}>
          {renderStatusIcon(issue)}
        </Div>
      </Div>
      <Div display="flex" flexDirection="column" alignItems="flex-start">
        <IssueTitle to={issue.url}>{issue.title}</IssueTitle>
        <Small
          marginTop={spacing[1]}
          fontSize={fontSizes[0]}
          lineHeight={lineHeights.tight}
          color={colors.gray[7]}
        >
          #{issue.number} {issue.closed ? '' : 'opened'}
          {issue.author &&
            `by
          ${issue.author.login}`}
        </Small>
      </Div>
    </Div>
  )
}

export default Issue
