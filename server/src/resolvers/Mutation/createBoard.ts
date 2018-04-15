import { Context, getUserId } from '../../utils'

function createBoard(root, { name }, context: Context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createBoard(
    {
      data: {
        name,
        owner: { connect: { id: userId } },
      },
    },
    info,
  )
}

export default createBoard
