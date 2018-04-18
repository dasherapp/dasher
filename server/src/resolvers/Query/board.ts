import { Context } from '../../utils'

function board(root, { id }, context: Context, info) {
  return context.db.query.board({ where: { id } }, info)
}

export default board
