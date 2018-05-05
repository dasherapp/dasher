import React from 'react'

import PageContainer from './PageContainer'
import Header from './Header'
import AccountMenu from './AccountMenu'
import Boards from './Boards'
import Spacer from './Spacer'

function HomePage() {
  return (
    <div>
      <Header>
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
