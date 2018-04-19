import { Context } from '../../utils'

function updateBoard(root, { id, name }, context: Context, info) {
  return context.db.mutation.updateBoard(
    {
      data: {
        name,
      },
      where: { id },
    },
    info,
  )
}

export default updateBoard
