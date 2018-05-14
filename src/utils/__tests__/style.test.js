import {
  toMediaQuery,
  joinSpacing,
  toAlpha,
  propStyles,
  getReadableColor,
} from '../style'

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

describe('getReadableColor()', () => {
  it('returns the more readable text color given a background color', () => {
    expect(getReadableColor('#fff')).toBe('#000')
    expect(getReadableColor('#eee')).toBe('#000')
    expect(getReadableColor('#d4c5f9')).toBe('#000')
    expect(getReadableColor('#000')).toBe('#fff')
    expect(getReadableColor('#333')).toBe('#fff')
    expect(getReadableColor('#006b75')).toBe('#fff')
  })

  it('works with an rgb color value', () => {
    expect(getReadableColor('rgb(238, 238, 238)')).toBe('#000')
  })
})

describe('toAlpha()', () => {
  it('returns the transparent version a color', () => {
    expect(toAlpha('#808080')).toBe('rgba(0, 0, 0, 0.5)')
    expect(toAlpha('#000')).toBe('rgb(0, 0, 0)')
    expect(toAlpha('#fff')).toBe('rgba(255, 255, 255, 0)')
    expect(toAlpha('#ff7f7f')).toBe('rgba(255, 0, 0, 0.5)')
    expect(toAlpha('#bdddd8')).toBe('rgba(0, 124, 104, 0.26)')
    expect(toAlpha('#7e3b65')).toBe('rgba(87, 0, 55, 0.77)')
  })

  it('works with custom background color', () => {
    expect(toAlpha('#414141', '#000')).toBe('rgba(255, 255, 255, 0.25)')
    expect(toAlpha('#91974c', '#f34949')).toBe('rgba(14, 255, 80, 0.43)')
    expect(toAlpha('#808080', '#000')).toBe('rgba(255, 255, 255, 0.5)')
    expect(toAlpha('#ae1268', '#e93636')).toBe('rgba(145, 0, 129, 0.67)')
  })

  it('works with an rgb color value', () => {
    expect(toAlpha('rgb(128, 128, 128)')).toBe('rgba(0, 0, 0, 0.5)')
  })
})

describe('propStyles()', () => {
  it('returns a function that returns the an array of style objects', () => {
    const dynamicStyles = propStyles({
      disabled: { backgroundColor: 'gray' },
      fullWidth: { width: '100%' },
    })

    expect(dynamicStyles()).toEqual([])
    expect(dynamicStyles({ disabled: true })).toEqual([
      { backgroundColor: 'gray' },
    ])
    expect(dynamicStyles({ disabled: false, fullWidth: true })).toEqual([
      null,
      { width: '100%' },
    ])
    expect(dynamicStyles({ disabled: true, fullWidth: true })).toEqual([
      { backgroundColor: 'gray' },
      { width: '100%' },
    ])
  })
})
