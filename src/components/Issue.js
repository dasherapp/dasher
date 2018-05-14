import React from 'react'
import styled from 'react-emotion'
import { colors, fontSizes, fontWeights, lineHeights, spacing } from '../theme'
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
import IssueLabel from './IssueLabel'

const IssueTitle = styled.a({
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
  const buildStatus = get(
    ['commits', 'commits', 0, 'commit', 'status', 'state'],
    issue,
  )

  switch (buildStatus) {
    case 'SUCCESS':
      return <CheckIcon color={colors.green[8]} size={16} />

    case 'PENDING':
      return <SmallCircleIcon color={colors.yellow[8]} size={16} />

    case 'FAILURE':
      return <XIcon color={colors.red[8]} size={16} />

    default:
      return null
  }
}

function Issue({ issue }) {
  return (
    <Flex
      css={{
        padding: spacing[3],
        paddingRight: spacing[4],
        borderTop: `1px solid ${colors.gray[2]}`,
      }}
    >
      <Flex
        css={{
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: spacing[3],
        }}
      >
        {renderStateIcon(issue)}
        <div css={{ marginTop: spacing[1] }} />
        {renderStatusIcon(issue)}
      </Flex>
      <Flex css={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <IssueTitle href={issue.url} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </IssueTitle>
        <small
          css={{
            marginTop: spacing[0],
            fontSize: fontSizes[0],
            lineHeight: lineHeights.normal,
            color: colors.gray[6],
          }}
        >
          #{issue.number}
          {issue.closed ? '' : ' opened'}
          {issue.author &&
            ` by
          ${issue.author.login}`}
        </small>
        {issue.labels.totalCount > 0 && (
          <Flex css={{ flexWrap: 'wrap', marginTop: spacing[0] }}>
            {issue.labels.labels.map(label => (
              <IssueLabel color={`#${label.color}`}>{label.name}</IssueLabel>
            ))}
            {issue.labels.totalCount > issue.labels.labels.length && (
              <IssueLabel>...</IssueLabel>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default Issue
