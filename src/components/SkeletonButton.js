import glamorous from 'glamorous'

import {
  spacing,
  fontSizes,
  fontWeights,
  lineHeights,
  colors,
  radii,
  transition,
} from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'

const SkeletonButton = glamorous.button({
  width: 360,
  padding: joinSpacing(spacing[6], 0),
  fontFamily: 'inherit',
  fontWeight: fontWeights.bold,
  fontSize: fontSizes[2],
  lineHeight: lineHeights.normal,
  color: toAlpha(colors.gray[6]),
  backgroundColor: 'transparent',
  border: `2px dashed ${toAlpha(colors.gray[4])}`,
  borderRadius: radii[1],
  cursor: 'pointer',
  outline: 0,
  transition: `background-color ${transition.duration} ${transition.easing}`,

  ':hover,:focus': {
    backgroundColor: toAlpha(colors.gray[1]),
  },
})

export default SkeletonButton
