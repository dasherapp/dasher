import system from 'system-components/emotion'

const Header = system({
  is: 'div',
  display: 'flex',
  flex: '0 0 auto',
  alignItems: 'center',
  height: 56,
  px: 4,
  py: 0,
  borderBottom: '1px solid',
  borderColor: 'grayAlpha.2',
})

Header.displayName = 'Header'

export default Header
