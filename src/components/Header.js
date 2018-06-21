import styled from 'react-emotion'
import { colors, space } from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: 56,
  padding: joinSpacing(0, space[4]),
  borderBottom: `1px solid ${toAlpha(colors.gray[2])}`,
})

export default Header
