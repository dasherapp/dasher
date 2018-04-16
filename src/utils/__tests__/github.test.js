import { getGithubAuthUrl } from '../github'

describe('getGithubAuthUrl()', () => {
  test('returns correct URL', () => {
    const location = {
      origin: 'http://localhost:3000',
    }

    expect(getGithubAuthUrl(location)).toMatchSnapshot()
  })
})
