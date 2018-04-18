import me from './Query/me'
import boards from './Query/boards'
import board from './Query/board'
import createBoard from './Mutation/createBoard'
import authenticate from './Mutation/authenticate'

const resolvers = {
  Query: {
    me,
    boards,
    board,
  },
  Mutation: {
    createBoard,
    authenticate,
  },
}

export default resolvers
