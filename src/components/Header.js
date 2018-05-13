import styled from 'react-emotion'
import { colors, spacing } from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: 56,
  padding: joinSpacing(0, spacing[3]),
  borderBottom: `1px solid ${toAlpha(colors.gray[2])}`,
})

export default Header
