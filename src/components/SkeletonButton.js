import { number, oneOfType, string, func } from 'prop-types'
import styled from 'react-emotion'

import {
  spacing,
  fontSizes,
  fontWeights,
  lineHeights,
  colors,
  radii,
  transition,
  breakpoints,
} from '../theme'
import { joinSpacing, toAlpha } from '../utils/style'

const SkeletonButton = styled.button(props => ({
  width: props.width,
  padding: joinSpacing(spacing[4], 0),
  fontFamily: 'inherit',
  fontWeight: fontWeights.bold,
  fontSize: fontSizes[2],
  lineHeight: lineHeights.normal,
  color: toAlpha(colors.gray[6]),
  backgroundColor: 'transparent',
  border: `2px dashed ${toAlpha(colors.gray[4])}`,
  borderRadius: radii[1],
  cursor: 'pointer',
  outline: 0,
  transition: `background-color ${transition.duration} ${transition.easing}`,

  ':hover,:focus': {
    backgroundColor: toAlpha(colors.gray[1]),
  },

  [breakpoints.sm]: {
    padding: joinSpacing(spacing[6], 0),
  },
}))

SkeletonButton.propTypes = {
  width: oneOfType([number, string]),
  onClick: func,
}

SkeletonButton.defaultProps = {
  width: '100%',
  onClick: () => {},
}

export default SkeletonButton
