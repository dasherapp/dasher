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
    border: '2px dashed',
    borderColor: 'grayAlpha.4',
  },
  props => ({
    fontFamily: 'inherit',
    cursor: 'pointer',
    outline: 0,

    '&:hover, &:focus': {
      backgroundColor: themeGet('colors.grayAlpha.1')(props),
    },
  }),
)

SkeletonButton.displayName = 'SkeletonButton'

export default SkeletonButton
