import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import { Subscribe } from 'unstated'

import {
  spacing,
  colors,
  radii,
  fontSizes,
  shadows,
  transition,
} from '../theme'
import ModalContainer from '../containers/ModalContainer'
import UpdateBoardModal from './UpdateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'

const CardLink = glamorous(Link)({
  height: 160,
  padding: spacing[4],
  fontSize: fontSizes[3],
  textDecoration: 'none',
  color: colors.gray[9],
  backgroundColor: colors.white,
  borderRadius: radii[1],
  boxShadow: shadows[2],
  outline: 0,
  transition: `box-shadow ${transition.duration} ${transition.easing}`,

  ':hover,:focus': {
    boxShadow: shadows[3],
  },
})

function BoardCard({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <CardLink to={`/board/${board.id}`}>
          {board.name}
          <button
            onClick={event => {
              event.preventDefault()
              modal.openModal(UpdateBoardModal, {
                board,
              })
            }}
          >
            Edit board
          </button>
          <button
            onClick={event => {
              event.preventDefault()
              modal.openModal(DeleteBoardModal, {
                board: board,
              })
            }}
          >
            Delete board
          </button>
        </CardLink>
      )}
    </Subscribe>
  )
}

export default BoardCard
