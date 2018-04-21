import { toMediaQuery, joinSpacing } from '../style'

describe('toMediaQuery()', () => {
  it('uses em by default', () => {
    expect(toMediaQuery(32)).toMatchSnapshot()
  })

  it('works with other units', () => {
    expect(toMediaQuery('1200px')).toMatchSnapshot()
    expect(toMediaQuery('64rem')).toMatchSnapshot()
  })
})

describe('joinSpacing()', () => {
  it('works with one to four arguments', () => {
    expect(joinSpacing(4)).toBe('4px')
    expect(joinSpacing(4, 8)).toBe('4px 8px')
    expect(joinSpacing(4, 8, 12)).toBe('4px 8px 12px')
    expect(joinSpacing(4, 8, 12, 16)).toBe('4px 8px 12px 16px')
  })

  it('works with other units', () => {
    expect(joinSpacing('4em')).toBe('4em')
    expect(joinSpacing(4, '8rem')).toBe('4px 8rem')
    expect(joinSpacing('4em', 8, '12rem')).toBe('4em 8px 12rem')
    expect(joinSpacing(0, 'auto')).toBe('0 auto')
  })

  it('throws an error when passed more than four arguments', () => {
    expect(() => joinSpacing(1, 2, 3, 4, 5)).toThrowErrorMatchingSnapshot()
  })
})
