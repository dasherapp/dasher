import system from 'system-components/emotion'
import { duration, timingFunction, transitionProperty } from '../utils/style'

const CardLink = system(
  {
    is: 'a',
    p: 4,
    bg: 'white',
    boxShadow: 1,
    borderRadius: 2,
    timingFunction: 'standard',
    duration: 2,
    transitionProperty: 'box-shadow',

    hover: {
      boxShadow: 2,
    },

    focus: {
      boxShadow: 2,
    },
  },
  {
    textDecoration: 'none',
    outline: 0,
  },
  'height',
  timingFunction,
  duration,
  transitionProperty,
)

CardLink.displayName = 'CardLink'

CardLink.defaultProps.blacklist = [
  ...Object.keys(CardLink.propTypes),
  ...Object.keys(timingFunction.propTypes),
  ...Object.keys(duration.propTypes),
  ...Object.keys(transitionProperty.propTypes),
]

export default CardLink
