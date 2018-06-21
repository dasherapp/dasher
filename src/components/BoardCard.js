import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import {
  breakpoints,
  colors,
  radii,
  shadows,
  space,
  transition,
} from '../theme'
import Button from './Button'
import DeleteBoardModal from './DeleteBoardModal'
import Dropdown, { MenuItem } from './Dropdown'
import Flex from './Flex'
import Heading from './Heading'
import { EllipsesIcon } from './Icon'
import Spacer from './Spacer'
import UpdateBoardModal from './UpdateBoardModal'

const CardLink = styled(Link)({
  padding: space[4],
  textDecoration: 'none',
  backgroundColor: colors.white,
  borderRadius: radii[2],
  boxShadow: shadows[1],
  outline: 0,
  transitionProperty: 'box-shadow',
  transitionDuration: transition.duration,
  transitionTimingFunction: transition.easing,

  ':hover,:focus': {
    boxShadow: shadows[2],
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
