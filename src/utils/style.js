function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}

function em(value) {
  return isNumber(value) ? value + 'em' : value
}

function px(value) {
  return isNumber(value) ? value + 'px' : value
}

export function mq(breakpoint) {
  return `@media screen and (min-width: ${em(breakpoint)})`
}
