import { array, number } from 'prop-types'
import React from 'react'
import { spacing } from '../theme'
import Flex from './Flex'
import IssueLabel from './IssueLabel'

function IssueLabels({ labels, totalCount }) {
  const remainingLabels = totalCount - labels.length

  return (
    totalCount > 0 && (
      <Flex css={{ flexWrap: 'wrap', marginTop: spacing[0] }}>
        {labels.map(label => (
          <IssueLabel key={label.name} color={`#${label.color}`}>
            {label.name}
          </IssueLabel>
        ))}
        {Boolean(remainingLabels) && <IssueLabel>...</IssueLabel>}
      </Flex>
    )
  )
}

IssueLabels.propTypes = {
  labels: array.isRequired,
  totalCount: number.isRequired,
}

export default IssueLabels
