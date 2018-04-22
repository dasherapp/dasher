import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import { Subscribe } from 'unstated'

import { spacing, colors, radii, fontSizes } from '../theme'
import ModalContainer from '../containers/ModalContainer'
import UpdateBoardModal from './UpdateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'

const BoardCardContainer = glamorous.div({
  height: 160,
  padding: spacing[2],
  fontSize: fontSizes[3],
  color: colors.gray[9],
  backgroundColor: colors.white,
  borderRadius: radii[1],
})

function BoardCard({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <Link to={`/board/${board.id}`}>
          <BoardCardContainer>
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
          </BoardCardContainer>
        </Link>
      )}
    </Subscribe>
  )
}

export default BoardCard
