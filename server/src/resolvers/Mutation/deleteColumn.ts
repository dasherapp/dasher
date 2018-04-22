import { Context } from '../../utils'

function deleteColumn(root, { id }, context: Context, info) {
  return context.db.mutation.deleteColumn(
    {
      where: { id },
    },
    info,
  )
}

export default deleteColumn
