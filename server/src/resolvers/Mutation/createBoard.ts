import { Context } from '../../utils'

function createBoard(root, { name, ownerLogin }, context: Context, info) {
  return context.db.mutation.createBoard(
    {
      data: {
        name,
        owner: { connect: { login: ownerLogin } },
      },
    },
    info,
  )
}

export default createBoard
