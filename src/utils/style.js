function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}

export function toUnit(unit) {
  return value => (isNumber(value) && value !== 0 ? value + unit : value)
}

export function toMediaQuery(breakpoint) {
  return `@media screen and (min-width: ${toUnit('em')(breakpoint)})`
}

export function joinSpacing() {
  if (arguments.length > 4) {
    throw new Error('Too many arguments')
  }

  return Array.from(arguments)
    .map(toUnit('px'))
    .join(' ')
}
