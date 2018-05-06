import React from 'react'

import PageContainer from './PageContainer'
import Header from './Header'
import Logo from './Logo'
import AccountMenu from './AccountMenu'
import Boards from './Boards'
import Spacer from './Spacer'

function HomePage() {
  return (
    <div>
      <Header>
        <Logo />
        <Spacer />
        <AccountMenu />
      </Header>
      <PageContainer>
        <Boards />
      </PageContainer>
    </div>
  )
}

export default HomePage
