import React from 'react'
import { shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Subscribe } from 'unstated'

import ModalContainer from '../containers/ModalContainer'
import EditBoardModal from './EditBoardModal'
import NotFoundPage from './NotFoundPage'
import AccountMenu from './AccountMenu'

const BOARD_QUERY = gql`
  query BoardQuery($id: ID!) {
    board(id: $id) {
      id
      name
    }
  }
`

function BoardPage({ match }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <Query query={BOARD_QUERY} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            if (!data.board) return <NotFoundPage />

            return (
              <div>
                <AccountMenu />
                <h1>{data.board.name}</h1>
                <button
                  onClick={() =>
                    modal.showModal(EditBoardModal, { boardId: data.board.id })
                  }
                >
                  Edit board
                </button>
              </div>
            )
          }}
        </Query>
      )}
    </Subscribe>
  )
}

BoardPage.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequried,
  }).isRequried,
}

export default BoardPage
