import { gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import BoardCard from './BoardCard'
import Button from './Button'
import CreateBoardModal from './CreateBoardModal'
import Flex from './Flex'
import Grid from './Grid'
import Heading from './Heading'
import SkeletonButton from './SkeletonButton'
import Spacer from './Spacer'

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
          <Flex pt={[5, 7]} pb={5} alignItems="center">
            <Heading is="h1" fontSize={[4, 5]}>
              Boards
            </Heading>
            <Spacer />
            <Button onClick={() => modal.openModal(CreateBoardModal)}>
              New board
            </Button>
          </Flex>
          <Query query={BOARDS_QUERY}>
            {({ data, loading, error }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error</div>

              return (
                <Grid maxColumnWidth={300} gridGap={4}>
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
