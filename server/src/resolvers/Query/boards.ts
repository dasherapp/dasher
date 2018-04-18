import { Context, getUserId } from '../../utils'

function boards(root, args, context: Context, info) {
  const id = getUserId(context)
  return context.db.query.boards({ where: { owner: { id } } }, info)
}

export default boards
