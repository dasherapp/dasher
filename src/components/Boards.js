import { gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import { spacing } from '../theme'
import BoardCard from './BoardCard'
import Button from './Button'
import CreateBoardModal from './CreateBoardModal'
import Flex from './Flex'
import Grid from './Grid'
import SkeletonButton from './SkeletonButton'

export const BOARDS_QUERY = gql`
  query BoardsQuery {
    boards {
      id
      name
    }
  }
`

function Boards() {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <div>
          <Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <h1>Boards</h1>
            <Button onClick={() => modal.openModal(CreateBoardModal)}>
              New board
            </Button>
          </Flex>
          <Query query={BOARDS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error</div>

              return (
                <Grid width={300} gap={spacing[3]}>
                  {data.boards.map(board => (
                    <BoardCard key={board.id} board={board} />
                  ))}

                  <SkeletonButton
                    onClick={() => modal.openModal(CreateBoardModal)}
                  >
                    New board
                  </SkeletonButton>
                </Grid>
              )
            }}
          </Query>
        </div>
      )}
    </Subscribe>
  )
}

export default Boards
