import me from './Query/me'
import boards from './Query/boards'
import board from './Query/board'
import createBoard from './Mutation/createBoard'
import createColumn from './Mutation/createColumn'
import updateBoard from './Mutation/updateBoard'
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
    authenticate,
  },
}

export default resolvers
