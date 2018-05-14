import { array, number } from 'prop-types'
import React from 'react'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import { spacing } from '../theme'
import Flex from './Flex'
import IssueLabel from './IssueLabel'

function IssueLabels({ labels, totalCount }) {
  const remainingLabels = totalCount - labels.length

  return (
    totalCount > 0 && (
      <Flex css={{ flexWrap: 'wrap', marginTop: spacing[0] }}>
        {labels.map((label, index) => (
          <IssueLabel key={index} color={`#${label.color}`}>
            {label.name}
          </IssueLabel>
        ))}
        {Boolean(remainingLabels) && (
          <Tooltip
            title={
              `${remainingLabels} more ` +
              (remainingLabels === 1 ? 'label' : 'labels')
            }
            animation="scale"
            size="small"
            position="bottom"
            distance={spacing[0]}
          >
            <IssueLabel>...</IssueLabel>
          </Tooltip>
        )}
      </Flex>
    )
  )
}

IssueLabels.propTypes = {
  labels: array.isRequired,
  totalCount: number.isRequired,
}

export default IssueLabels
