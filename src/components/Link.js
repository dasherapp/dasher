import system from 'system-components/emotion'
import { duration, timingFunction, transitionProperty } from '../utils/style'

const Link = system(
  {
    is: 'a',
    timingFunction: 'standard',
    duration: 1,
    transitionProperty: 'color',

    hover: {
      color: 'indigo.8',
    },
  },
  {
    textDecoration: 'none',
  },
  timingFunction,
  duration,
  transitionProperty,
)

Link.displayName = 'Link'

Link.defaultProps.blacklist = [
  ...Object.keys(Link.propTypes),
  ...Object.keys(timingFunction.propTypes),
  ...Object.keys(duration.propTypes),
  ...Object.keys(transitionProperty.propTypes),
]

export default Link
