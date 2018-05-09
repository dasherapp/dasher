import {
  logIn,
  logOut,
  isLoggedIn,
  AUTH_TOKEN_KEY,
  GITHUB_TOKEN_KEY,
} from '../auth'

afterEach(() => {
  localStorage.clear()
})

describe('logIn()', () => {
  it('stores auth token in localStorage')
})

describe('logOut()', () => {
  it('removes auth token and github token from localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'fake_auth_token')
    localStorage.setItem(GITHUB_TOKEN_KEY, 'fake_github_token')

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe('fake_auth_token')
    expect(localStorage.getItem(GITHUB_TOKEN_KEY)).toBe('fake_github_token')

    logOut()

    expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull()
    expect(localStorage.getItem(GITHUB_TOKEN_KEY)).toBeNull()
  })
})

describe('isLoggedIn()', () => {
  it('returns true if auth token and github token are in localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'fake_auth_token')
    localStorage.setItem(GITHUB_TOKEN_KEY, 'fake_github_token')
    expect(isLoggedIn()).toBe(true)
  })

  it('returns false if auth token and github token are not in localStorage', () => {
    expect(isLoggedIn()).toBe(false)
  })

  it('returns false if auth token is not in localStorage', () => {
    localStorage.setItem(GITHUB_TOKEN_KEY, 'fake_github_token')
    expect(isLoggedIn()).toBe(false)
  })

  it('returns false if github token is not in localStorage', () => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'fake_auth_token')
    expect(isLoggedIn()).toBe(false)
  })
})
