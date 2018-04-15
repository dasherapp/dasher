import me from './Query/me'
import boards from './Query/boards'
import createBoard from './Mutation/createBoard'
import authenticate from './Mutation/authenticate'

const resolvers = {
  Query: {
    me,
    boards,
  },
  Mutation: {
    createBoard,
    authenticate,
  },
}

export default resolvers
