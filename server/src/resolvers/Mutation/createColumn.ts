import { Context } from '../../utils'

function createColumn(
  root,
  { boardId, index, name, query },
  context: Context,
  info,
) {
  return context.db.mutation.createColumn(
    {
      data: {
        board: { connect: { id: boardId } },
        index,
        name,
        query,
      },
    },
    info,
  )
}

export default createColumn
