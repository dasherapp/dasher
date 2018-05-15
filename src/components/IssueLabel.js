import { string } from 'prop-types'
import styled from 'react-emotion'
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  spacing,
} from '../theme'
import { getReadableColor, joinSpacing, toAlpha } from '../utils/style'
import { cleanElement } from '../utils/utils'

const Label = styled(cleanElement({ type: 'span', excludeProps: ['color'] }))(
  props => ({
    display: 'inline-block',
    padding: joinSpacing(spacing[0], spacing[1]),
    marginTop: spacing[0],
    marginRight: spacing[0],
    fontSize: fontSizes[0],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.none,
    color: getReadableColor(props.color),
    backgroundColor: props.color,
    borderRadius: radii[0],
    boxShadow: `inset 0 -1px 0 ${toAlpha(colors.gray[2])}`,
  }),
)

Label.propTypes = {
  color: string,
}

Label.defaultProps = {
  color: colors.gray[2],
}

export default Label
