import system from 'system-components/emotion'
import { duration, timingFunction, transitionProperty } from '../utils/style'

const SkeletonButton = system(
  {
    is: 'button',
    width: 1,
    px: 0,
    py: [5, 7],
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 'normal',
    color: 'grayAlpha.6',
    bg: 'transparent',
    borderRadius: 2,
    border: '2px dashed',
    borderColor: 'grayAlpha.4',
    timingFunction: 'standard',
    duration: 1,
    transitionProperty: 'background-color',

    hover: {
      backgroundColor: 'grayAlpha.1',
    },

    focus: {
      backgroundColor: 'grayAlpha.1',
    },
  },
  {
    fontFamily: 'inherit',
    cursor: 'pointer',
    outline: 0,
  },
  timingFunction,
  duration,
  transitionProperty,
)

SkeletonButton.displayName = 'SkeletonButton'

SkeletonButton.defaultProps.blacklist = [
  ...Object.keys(SkeletonButton.propTypes),
  ...Object.keys(timingFunction.propTypes),
  ...Object.keys(duration.propTypes),
  ...Object.keys(transitionProperty.propTypes),
]

export default SkeletonButton
