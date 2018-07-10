import { getReadableColor, propStyles, toAlpha } from '../style'

describe('getReadableColor()', () => {
  it('returns the more readable text color given a background color', () => {
    expect(getReadableColor('#fff')).toBe('#000000')
    expect(getReadableColor('#eee')).toBe('#000000')
    expect(getReadableColor('#d4c5f9')).toBe('#000000')
    expect(getReadableColor('#000')).toBe('#ffffff')
    expect(getReadableColor('#333')).toBe('#ffffff')
    expect(getReadableColor('#006b75')).toBe('#ffffff')
  })

  it('works with an rgb color value', () => {
    expect(getReadableColor('rgb(238, 238, 238)')).toBe('#000000')
  })
})

describe('toAlpha()', () => {
  it('returns the transparent version a color', () => {
    expect(toAlpha('#808080')).toBe('rgba(0,0,0,0.5)')
    expect(toAlpha('#000')).toBe('#000')
    expect(toAlpha('#fff')).toBe('rgba(255,255,255,0)')
    expect(toAlpha('#ff7f7f')).toBe('rgba(255,0,0,0.5)')
    expect(toAlpha('#bdddd8')).toBe('rgba(0,124,104,0.26)')
    expect(toAlpha('#7e3b65')).toBe('rgba(87,0,55,0.77)')
  })

  it('works with custom background color', () => {
    expect(toAlpha('#414141', '#000')).toBe('rgba(255,255,255,0.25)')
    expect(toAlpha('#91974c', '#f34949')).toBe('rgba(14,255,80,0.43)')
    expect(toAlpha('#808080', '#000')).toBe('rgba(255,255,255,0.5)')
    expect(toAlpha('#ae1268', '#e93636')).toBe('rgba(145,0,129,0.67)')
  })

  it('works with an rgb color value', () => {
    expect(toAlpha('rgb(128, 128, 128)')).toBe('rgba(0,0,0,0.5)')
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
