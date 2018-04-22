import glamorous from 'glamorous'

import { joinSpacing } from '../utils/style'
import { spacing, fontSizes, lineHeights, radii } from '../theme'

const SkeletonButton = glamorous.button({
  width: 360,
  padding: joinSpacing(spacing[6], 0),
  fontFamily: 'inherit',
  fontSize: fontSizes[2],
  lineHeight: lineHeights.normal,
  backgroundColor: 'transparent',
  border: '2px dashed burlywood',
  borderRadius: radii[1],
  cursor: 'pointer',
})

export default SkeletonButton
