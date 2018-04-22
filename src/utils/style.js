import color from 'color-string'
import memoize from 'fast-memoize'

const isNumber = value => typeof value === 'number' && !isNaN(value)

const toUnit = unit => value =>
  isNumber(value) && value !== 0 ? value + unit : value

export const toPx = toUnit('px')

export const toEm = toUnit('em')

export const toMediaQuery = breakpoint =>
  `@media screen and (min-width: ${toEm(breakpoint)})`

export const joinSpacing = (...args) => {
  if (args.length > 4) {
    throw new Error('Too many arguments')
  }

  return args.map(toPx).join(' ')
}

/**
 * Returns the transparent version of the `foreground` color,
 * as if it was blended over the `background` color.
 *
 * Source: https://git.io/vpYAv
 *
 * @param {string} foreground
 * @param {string} [background]
 * @returns {string}
 */
export const toAlpha = memoize(
  (foreground, background = '#fff') => {
    const r = 0
    const g = 1
    const b = 2

    const fgColor = color.get.rgb(foreground)
    const bgColor = color.get.rgb(background)

    let bestAlpha = [r, g, b]
      .map(
        channel =>
          (fgColor[channel] - bgColor[channel]) /
          ((0 < fgColor[channel] - bgColor[channel] ? 255 : 0) -
            bgColor[channel]),
      )
      .sort(function(a, b) {
        return b - a
      })[0]

    bestAlpha = Math.max(Math.min(bestAlpha, 1), 0)

    // Calculate the resulting color
    function processChannel(channel) {
      if (0 === bestAlpha) {
        return bgColor[channel]
      } else {
        return (
          bgColor[channel] + (fgColor[channel] - bgColor[channel]) / bestAlpha
        )
      }
    }

    return color.to.rgb(
      processChannel(r),
      processChannel(g),
      processChannel(b),
      Math.round(bestAlpha * 100) / 100,
    )
  },
  {
    strategy: memoize.strategies.variadic,
  },
)
