import color from 'color-string'
import { colors } from '../theme'
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
 * Returns either black or white depending on which color will be more readable
 * on top of the `background` color.
 *
 * Visibility is determined by comparing a set threshold with the calculated
 * brightness of the `background`. Color brightness is calculated using the
 * following formula:
 * ((Red value * 299) + (Green value * 587) + (Blue value * 114)) / 1000
 * Source: https://www.w3.org/TR/AERT/#color
 *
 * @param {string} background
 * @returns {string}
 *
 */
export const getReadableColor = background => {
  // The threshold ranges from 0 to 256. A threshold above the midpoint, 128, will
  // favor white text over black text.
  const threshold = 136

  const rgb = color.get.rgb(background)

  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

  return brightness > threshold ? colors.black : colors.white
}

/**
 * Returns the transparent version of the `foreground` color,
 * as if it was overlaid on the `background` color.
 *
 * Inspiration: https://git.io/vpYAv
 *
 * @param {string} foreground
 * @param {string} [background=#fff]
 * @returns {string}
 */
export const toAlpha = memoize(
  (foreground, background = '#fff') => {
    const r = 0
    const g = 1
    const b = 2

    // Convert color string to array (i.e. [r, g, b, a])
    const fgColor = color.get.rgb(foreground)
    const bgColor = color.get.rgb(background)

    // Calculate alpha value
    let alpha = [r, g, b]
      .map(
        channel =>
          (fgColor[channel] - bgColor[channel]) /
          ((0 < fgColor[channel] - bgColor[channel] ? 255 : 0) -
            bgColor[channel]),
      )
      .sort((a, b) => b - a)[0]

    // Keep alpha value between 0 and 1
    alpha = Math.max(Math.min(alpha, 1), 0)

    // Calculate the resulting color
    function processChannel(channel) {
      return 0 === alpha
        ? bgColor[channel]
        : bgColor[channel] + (fgColor[channel] - bgColor[channel]) / alpha
    }

    return color.to.rgb(
      processChannel(r),
      processChannel(g),
      processChannel(b),
      Math.round(alpha * 100) / 100,
    )
  },
  {
    strategy: memoize.strategies.variadic,
  },
)

/**
 * Makes it easier to create components that
 * accept props to enable/disable styles.
 *
 * Accepts an object where the key is a prop and the value is
 * the styles object that should be applied if that prop is passed.
 *
 * Source: https://codesandbox.io/s/AGRRMl63 by @kentcdodds
 *
 * @param {Object} styles - An object mapping props to styles
 * @return {Function} - A dynamic styles function
 */
export const propStyles = styles => (props = {}) =>
  Object.keys(props).map(key => {
    if (props[key]) {
      return typeof styles[key] === 'function'
        ? styles[key](props)
        : styles[key]
    }
    return null
  })
