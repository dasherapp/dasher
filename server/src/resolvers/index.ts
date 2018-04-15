import boards from './Query/boards'
import createBoard from './Mutation/createBoard'
import authenticate from './Mutation/authenticate'

const resolvers = {
  Query: {
    boards,
  },
  Mutation: {
    createBoard,
    authenticate,
  },
}

export default resolvers
