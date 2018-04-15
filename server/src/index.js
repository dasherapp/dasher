const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    boards(root, args, context, info) {
      return context.db.query.boards({}, info)
    },
  },
  Mutation: {
    createBoard(root, { name, ownerLogin }, context, info) {
      return context.db.mutation.createBoard(
        {
          data: {
            name,
            owner: { connect: { login: ownerLogin } },
          },
        },
        info,
      )
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/dasher/dasher/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
