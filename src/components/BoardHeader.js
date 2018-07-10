import React from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import AccountMenu from './AccountMenu'
import Button from './Button'
import DeleteBoardModal from './DeleteBoardModal'
import Dropdown, { MenuItem } from './Dropdown'
import Header from './Header'
import Heading from './Heading'
import { ArrowLeftIcon, ChevronDownIcon } from './Icon'
import Spacer from './Spacer'
import UpdateBoardModal from './UpdateBoardModal'

function BoardHeader({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <Header>
          <Button is={Link} to="/" buttonStyle="icon">
            <ArrowLeftIcon />
          </Button>
          <Spacer />
          <Heading is="h1" mr={1} fontSize={3}>
            {board.name}
          </Heading>
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
