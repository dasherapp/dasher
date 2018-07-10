import React from 'react'
import AccountMenu from './AccountMenu'
import Boards from './Boards'
import Header from './Header'
import Logo from './Logo'
import PageContainer from './PageContainer'
import Spacer from './Spacer'

function HomePage() {
  return (
    <div>
      <Header>
        <Logo />
        <Spacer />
        <AccountMenu />
      </Header>
      <PageContainer py={[5, 7]}>
        <Boards />
      </PageContainer>
    </div>
  )
}

export default HomePage
