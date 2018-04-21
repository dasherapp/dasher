import { Context } from '../../utils'

function deleteBoard(root, { id }, context: Context, info) {
  return context.db.mutation.deleteBoard(
    {
      where: { id },
    },
    info,
  )
}

export default deleteBoard
