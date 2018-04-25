import React from 'react'

import PageContainer from './PageContainer'
import AccountMenu from './AccountMenu'
import Boards from './Boards'
import Flex from './Flex'
import Spacer from './Spacer'
import { spacing } from '../theme'

function HomePage() {
  return (
    <div>
      <Flex padding={spacing[3]}>
        <Spacer />
        <AccountMenu />
      </Flex>
      <PageContainer>
        <Boards />
      </PageContainer>
    </div>
  )
}

export default HomePage
