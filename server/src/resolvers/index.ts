import boards from './Query/boards'
import createBoard from './Mutation/createBoard'

const resolvers = {
  Query: {
    boards,
  },
  Mutation: {
    createBoard,
  },
}

export default resolvers
