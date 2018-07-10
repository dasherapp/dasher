import React from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import Button from './Button'
import CardLink from './CardLink'
import DeleteBoardModal from './DeleteBoardModal'
import Dropdown, { MenuItem } from './Dropdown'
import Flex from './Flex'
import Heading from './Heading'
import { EllipsesIcon } from './Icon'
import Spacer from './Spacer'
import UpdateBoardModal from './UpdateBoardModal'

function BoardCard({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <CardLink is={Link} to={`/board/${board.id}`} height={['auto', 160]}>
          <Flex alignItems="center">
            <Heading is="span" ml={2} fontSize={[2, 3]}>
              {board.name}
            </Heading>
            <Spacer />
            <Dropdown
              renderMenuButton={({ getMenuButtonProps }) => (
                <Button
                  {...getMenuButtonProps({
                    refKey: 'innerRef',
                    buttonStyle: 'icon',
                  })}
                >
                  <EllipsesIcon />
                </Button>
              )}
            >
              <MenuItem
                onClick={event => {
                  event.preventDefault()
                  modal.openModal(UpdateBoardModal, { board })
                }}
              >
                Edit board
              </MenuItem>
              <MenuItem
                onClick={event => {
                  event.preventDefault()
                  modal.openModal(DeleteBoardModal, { board })
                }}
              >
                Delete board
              </MenuItem>
            </Dropdown>
          </Flex>
        </CardLink>
      )}
    </Subscribe>
  )
}

export default BoardCard
