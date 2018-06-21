import { arrayOf, number, shape, string } from 'prop-types'
import React from 'react'
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
        {remainingCount > 0 ? <IssueLabel color="#eee">...</IssueLabel> : null}
      </Flex>
    )
  )
}

IssueLabels.propTypes = {
  labels: arrayOf(
    shape({
      name: string.isRequired,
      color: string.isRequired,
    }),
  ).isRequired,
  totalCount: number.isRequired,
}

export default IssueLabels
