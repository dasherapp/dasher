import color from 'color-string'
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
import { cleanElement } from '../utils/utils'

const Label = styled(cleanElement({ type: 'span', excludeProps: ['color'] }))(
  props => ({
    display: 'inline-block',
    padding: `${spacing[1]}px ${spacing[2]}px`,
    marginTop: spacing[1],
    marginRight: spacing[1],
    fontSize: fontSizes[0],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.none,
    color: colors.black,
    backgroundColor: props.color,
    borderRadius: radii[0],
    boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.10)',
  }),
)

Label.propTypes = {
  color: string,
}

Label.defaultProps = {
  color: colors.gray[2],
}

export default Label
