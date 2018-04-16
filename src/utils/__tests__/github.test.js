import { getGithubAuthUrl } from '../github'

describe('getGithubAuthUrl()', () => {
  it('returns correct URL', () => {
    const location = {
      origin: 'http://localhost:3000',
    }

    expect(getGithubAuthUrl(location)).toMatchSnapshot()
  })
})
