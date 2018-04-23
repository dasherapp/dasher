import { Context } from '../../utils'

function updateColumn(root, { id, index, name, query }, context: Context, info) {
  return context.db.mutation.updateColumn(
    {
      data: {
        index,
        name,
        query
      },
      where: { id },
    },
    info,
  )
}

export default updateColumn
