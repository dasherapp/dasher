import { array, number } from 'prop-types'
import React from 'react'
import { space } from '../theme'
import Flex from './Flex'
import IssueLabel from './IssueLabel'

function IssueLabels({ labels, totalCount }) {
  const remainingCount = totalCount - labels.length

  return (
    totalCount > 0 && (
      <Flex flexWrap="wrap" mt={1}>
        {labels.map(label => (
          <IssueLabel key={label.name} color={`#${label.color}`}>
            {label.name}
          </IssueLabel>
        ))}
        {Boolean(remainingCount) && <IssueLabel>...</IssueLabel>}
      </Flex>
    )
  )
}

IssueLabels.propTypes = {
  labels: array.isRequired,
  totalCount: number.isRequired,
}

export default IssueLabels
