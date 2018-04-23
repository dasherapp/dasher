import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import { Subscribe } from 'unstated'

import {
  breakpoints,
  spacing,
  colors,
  radii,
  fontSizes,
  shadows,
  transition,
  fontWeights,
} from '../theme'
import { toAlpha } from '../utils/style'
import ModalContainer from '../containers/ModalContainer'
import UpdateBoardModal from './UpdateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'
import Button from './Button'
import { EllipsesIcon } from './Icon'
import Flex from './Flex'
import Spacer from './Spacer'

const CardLink = glamorous(Link)({
  padding: spacing[3],
  fontSize: fontSizes[3],
  fontWeight: fontWeights.bold,
  textDecoration: 'none',
  color: toAlpha(colors.gray[9]),
  backgroundColor: colors.white,
  borderRadius: radii[1],
  boxShadow: shadows[1],
  outline: 0,
  transitionProperty: 'box-shadow, transform',
  transitionDuration: transition.duration,
  transitionTimingFunction: transition.easing,

  ':hover,:focus': {
    boxShadow: shadows[3],
    transform: 'translateY(-2px)',
  },

  [breakpoints.sm]: {
    height: 160,
  },
})

function BoardCard({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <CardLink to={`/board/${board.id}`}>
          <Flex alignItems="center" paddingLeft={spacing[1]}>
            <span>{board.name}</span>
            <Spacer />
            <Button kind="icon" onClick={event => event.preventDefault()}>
              <EllipsesIcon />
            </Button>
          </Flex>
          {/* <button
            onClick={event => {
              event.preventDefault()
              modal.openModal(UpdateBoardModal, { board })
            }}
          >
            Edit board
          </button>
          <button
            onClick={event => {
              event.preventDefault()
              modal.openModal(DeleteBoardModal, { board })
            }}
          >
            Delete board
          </button> */}
        </CardLink>
      )}
    </Subscribe>
  )
}

export default BoardCard
