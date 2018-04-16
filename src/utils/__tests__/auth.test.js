import { logIn, isLoggedIn, AUTH_TOKEN_KEY } from '../auth'

afterEach(() => {
  localStorage.clear()
})

describe('logIn()', () => {
  it('stores auth token in localStorage')
})

describe('isLoggedIn()', () => {
  it('returns true if auth token is in localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'fake_auth_token')
    expect(isLoggedIn()).toBe(true)
  })

  it('returns false if auth token is not in localStorage', () => {
    expect(isLoggedIn()).toBe(false)
  })
})
