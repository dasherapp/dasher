import React from 'react'
import glamorous from 'glamorous'
import { Subscribe } from 'unstated'

import { fontSizes, fontWeights, colors, spacing } from '../theme'
import { toAlpha } from '../utils/style'
import ModalContainer from '../containers/ModalContainer'
import UpdateBoardModal from './UpdateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'
import Header from './Header'
import Dropdown, { MenuItem } from './Dropdown'
import { ChevronDownIcon, ArrowLeftIcon } from './Icon'
import Button from './Button'
import ButtonLink from './ButtonLink'
import AccountMenu from './AccountMenu'
import Spacer from './Spacer'

const BoardName = glamorous.h1({
  marginRight: spacing[0],
  fontSize: fontSizes[3],
  fontWeight: fontWeights.bold,
  color: toAlpha(colors.gray[8]),
})

function BoardHeader({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <Header>
          <ButtonLink to="/" kind="icon">
            <ArrowLeftIcon />
          </ButtonLink>
          <Spacer />
          <BoardName>{board.name}</BoardName>
          <Dropdown
            align="left"
            renderMenuButton={({ getMenuButtonProps }) => (
              <Button
                {...getMenuButtonProps({
                  refKey: 'innerRef',
                  kind: 'icon',
                })}
              >
                <ChevronDownIcon size={16} />
              </Button>
            )}
          >
            <MenuItem
              onClick={() => modal.openModal(UpdateBoardModal, { board })}
            >
              Edit board
            </MenuItem>
            <MenuItem
              onClick={() => modal.openModal(DeleteBoardModal, { board })}
            >
              Delete board
            </MenuItem>
          </Dropdown>
          <Spacer />
          <AccountMenu />
        </Header>
      )}
    </Subscribe>
  )
}

export default BoardHeader
