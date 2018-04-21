import glamorous from 'glamorous'

import { spacing, fontSizes, lineHeights, radii } from '../theme'

const SkeletonButton = glamorous.button({
  width: 360,
  paddingTop: spacing[6],
  paddingBottom: spacing[6],
  paddingRight: 0,
  paddingLeft: 0,
  fontFamily: 'inherit',
  fontSize: fontSizes[2],
  lineHeight: lineHeights.normal,
  backgroundColor: 'transparent',
  border: '2px dashed burlywood',
  borderRadius: radii[1],
  cursor: 'pointer',
})

export default SkeletonButton
