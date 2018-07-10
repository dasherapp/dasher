import { string } from 'prop-types'
import { themeGet } from 'styled-system/dist/util'
import system from 'system-components/emotion'
import { getReadableColor } from '../utils/style'

const IssueLabel = system(
  {
    is: 'span',
    p: 1,
    mt: 1,
    mr: 1,
    fontSize: 0,
    fontWeight: 'bold',
    lineHeight: 'none',
    borderRadius: 1,
  },
  props => ({
    color: getReadableColor(props.color),
    backgroundColor: props.color,
    boxShadow: `inset 0 -1px 0 ${themeGet('colors.grayAlpha.2')(props)}`,
  }),
)

IssueLabel.displayName = 'IssueLabel'

IssueLabel.propTypes = {
  ...IssueLabel.propTypes,
  color: string.isRequired,
}

IssueLabel.defaultProps = {
  ...IssueLabel.defaultProps,
  blacklist: Object.keys(IssueLabel.propTypes),
}

export default IssueLabel
