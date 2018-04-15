import qs from 'qs'

const GITHUB_CLIENT_ID = '799bd70f09884c025750'

export function getGithubAuthUrl({ origin }) {
  const redirectUri = origin + '/callback'

  const queryString = qs.stringify({
    client_id: GITHUB_CLIENT_ID,
    scope: 'repo',
    redirect_uri: redirectUri,
  })

  return `https://github.com/login/oauth/authorize?${queryString}`
}
