import { Context } from '../../utils'

function boards(root, args, context: Context, info) {
  return context.db.query.boards({}, info)
}

export default boards
