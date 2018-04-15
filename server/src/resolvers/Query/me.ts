import { Context, getUserId } from '../../utils'

async function me(root, args, context: Context, info) {
  const id = getUserId(context)
  return await context.db.query.user({ where: { id } }, info)
}

export default me
