import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import { colors, fontSizes, fontWeights, space } from '../theme'
import { toAlpha } from '../utils/style'
import AccountMenu from './AccountMenu'
import Button from './Button'
import DeleteBoardModal from './DeleteBoardModal'
import Dropdown, { MenuItem } from './Dropdown'
import Header from './Header'
import { ArrowLeftIcon, ChevronDownIcon } from './Icon'
import Spacer from './Spacer'
import UpdateBoardModal from './UpdateBoardModal'

const BoardName = styled.h1({
  marginRight: space[1],
  fontSize: fontSizes[3],
  fontWeight: fontWeights.bold,
  color: toAlpha(colors.gray[8]),
})

function BoardHeader({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <Header>
          <Button is={Link} to="/" buttonStyle="icon">
            <ArrowLeftIcon />
          </Button>
          <Spacer />
          <BoardName>{board.name}</BoardName>
          <Dropdown
            align="left"
            renderMenuButton={({ getMenuButtonProps }) => (
              <Button
                {...getMenuButtonProps({
                  refKey: 'innerRef',
                  buttonStyle: 'icon',
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
