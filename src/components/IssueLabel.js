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
import { joinSpacing, toAlpha } from '../utils/style'
import { cleanElement } from '../utils/utils'

function getReadableColor(hex) {
  // Color brightness is determined by the following formula:
  // ((Red value * 299) + (Green value * 587) + (Blue value * 114)) / 1000
  // Source: https://www.w3.org/TR/AERT/#color

  // Lower threshold means more dark text on dark background
  const threshold = 136 // slightly above half of 256, to favor white text

  const rgb = color.get.rgb(hex)

  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000

  return brightness > threshold ? colors.black : colors.white
}

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
