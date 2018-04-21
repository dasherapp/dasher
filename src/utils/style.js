function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}

function toUnit(unit) {
  return value => (isNumber(value) && value !== 0 ? value + unit : value)
}

export const toPx = toUnit('px')

export const toEm = toUnit('em')

export function toMediaQuery(breakpoint) {
  return `@media screen and (min-width: ${toEm(breakpoint)})`
}

export function joinSpacing() {
  if (arguments.length > 4) {
    throw new Error('Too many arguments')
  }

  return Array.from(arguments)
    .map(toPx)
    .join(' ')
}
