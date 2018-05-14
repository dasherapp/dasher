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

function getReadableColor(hex) {
  // Color brightness is determined by the following formula:
  // ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
  // Source: https://www.w3.org/TR/AERT/#color

  // Lower threshold means more dark text on dark background
  const threshold = 136 // slightly above half of 256, to favor white text

  const rgb = color.get.rgb(hex)

  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

  return brightness > threshold ? '#000000' : '#ffffff'
}

const Label = styled(cleanElement({ type: 'span', excludeProps: ['color'] }))(
  props => ({
    display: 'inline-block',
    padding: `${spacing[1]}px ${spacing[2]}px`,
    marginTop: spacing[1],
    marginRight: spacing[1],
    fontSize: fontSizes[0],
    fontWeight: fontWeights.bold,
    lineHeight: lineHeights.none,
    color: getReadableColor(props.color),
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
