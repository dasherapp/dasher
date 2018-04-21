import React from 'react'
import { Link } from 'react-router-dom'
import glamorous from 'glamorous'
import { Subscribe } from 'unstated'

import { spacing, colors, radii, fontSizes } from '../theme'
import ModalContainer from '../containers/ModalContainer'
import UpdateBoardModal from './UpdateBoardModal'
import CreateBoardModal from './CreateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'

const BoardCardContainer = glamorous.div({
  height: 160,
  padding: spacing[2],
  fontSize: fontSizes[3],
  color: colors.gray[9],
  backgroundColor: colors.gray[2],
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
              onClick={() =>
                modal.openModal(UpdateBoardModal, {
                  board: board,
                })
              }
            >
              Edit board
            </button>
            <button
              onClick={() =>
                modal.openModal(DeleteBoardModal, {
                  board: board,
                })
              }
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
