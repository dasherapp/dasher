import glamorous from 'glamorous'

import { spacing, colors } from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'

const Header = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  height: 56,
  padding: joinSpacing(0, spacing[3]),
  borderBottom: `1px solid ${toAlpha(colors.gray[2])}`,
})

export default Header
