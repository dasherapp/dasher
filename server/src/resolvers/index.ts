import me from './Query/me'
import boards from './Query/boards'
import board from './Query/board'
import createBoard from './Mutation/createBoard'
import createColumn from './Mutation/createColumn'
import updateBoard from './Mutation/updateBoard'
import updateColumn from './Mutation/updateColumn'
import deleteBoard from './Mutation/deleteBoard'
import deleteColumn from './Mutation/deleteColumn'
import authenticate from './Mutation/authenticate'

const resolvers = {
  Query: {
    me,
    boards,
    board,
  },
  Mutation: {
    createBoard,
    createColumn,
    updateBoard,
    updateColumn,
    deleteBoard,
    deleteColumn,
    authenticate,
  },
}

export default resolvers
