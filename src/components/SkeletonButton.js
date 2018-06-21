import { themeGet } from 'styled-system'
import system from 'system-components/emotion'

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

    hover: {
      backgroundColor: 'grayAlpha.1',
    },

    focus: {
      backgroundColor: 'grayAlpha.1',
    },
  },
  props => ({
    fontFamily: 'inherit',
    border: `2px dashed ${themeGet('colors.grayAlpha.4')(props)}`,
    cursor: 'pointer',
    outline: 0,
    // TODO: Handle transition
  }),
)

SkeletonButton.displayName = 'SkeletonButton'

export default SkeletonButton
