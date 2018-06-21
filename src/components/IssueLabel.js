import { string } from 'prop-types'
import styled from 'react-emotion'
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  space,
} from '../theme'
import { getReadableColor, joinSpacing, toAlpha } from '../utils/style'
import { cleanElement } from '../utils/utils'

const Label = styled(cleanElement({ type: 'span', excludeProps: ['color'] }))(
  props => ({
    display: 'inline-block',
    padding: joinSpacing(space[0], space[1]),
    marginTop: space[0],
    marginRight: space[0],
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
