import { Context, getUserId } from '../../utils'

export const me = async (root, args, context: Context, info) => {
  const id = getUserId(context)
  return await context.db.query.user({ where: { id } }, info)
}
