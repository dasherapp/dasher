import glamorous from 'glamorous'

import { joinSpacing } from '../utils/style'
import { spacing } from '../theme'

const PageContainer = glamorous.div({
  maxWidth: 1200,
  margin: '0 auto',
  padding: joinSpacing(0, spacing[3]),
})

export default PageContainer
