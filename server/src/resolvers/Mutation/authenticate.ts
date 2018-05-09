import * as jwt from 'jsonwebtoken'
import { Context } from '../../utils'
import { getGithubToken, getGithubUser, GithubUser } from '../../github'

async function getPrismaUser(context: Context, githubUserId: string) {
  return await context.db.query.user({ where: { githubUserId } })
}

async function createPrismaUser(context: Context, githubUser: GithubUser) {
  const user = await context.db.mutation.createUser({
    data: {
      githubUserId: githubUser.id,
      name: githubUser.name,
      login: githubUser.login,
      avatarUrl: githubUser.avatar_url,
    },
  })
  return user
}

async function authenticate(root, { githubCode }, context: Context, info) {
  const githubToken = await getGithubToken(githubCode)
  const githubUser = await getGithubUser(githubToken)

  let user = await getPrismaUser(context, githubUser.id)

  if (!user) {
    user = await createPrismaUser(context, githubUser)
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    githubToken,
    user,
  }
}

export default authenticate
