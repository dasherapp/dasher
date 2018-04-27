import React from 'react'
import { oneOfType, oneOf, string, number } from 'prop-types'
import glamorous from 'glamorous'

import { colors, transition, radii } from '../theme'
import { toAlpha } from '../utils/style'
import Avatar from './Avatar'

const UnstyledButton = glamorous.button(props => ({
  display: 'inline-block',
  margin: 0,
  padding: 0,
  lineHeight: 0,
  background: 'transparent',
  border: 0,
  outline: 0,
  cursor: 'pointer',
  borderRadius: props.shape === 'square' ? radii[0] : '50%',
  transitionProperty: 'box-shadow',
  transitionDuration: transition.duration,
  transitionTimingFunction: transition.easing,

  ':focus': {
    boxShadow: `0 0 0 3px ${toAlpha(colors.gray[4])}`,
  },
}))

const AvatarButton = React.forwardRef(({ src, size, shape, ...props }, ref) => {
  return (
    <UnstyledButton innerRef={ref} shape={shape} {...props}>
      <Avatar src={src} size={size} shape={shape} />
    </UnstyledButton>
  )
})

AvatarButton.propTypes = {
  src: string.isRequired,
  size: oneOfType([string, number]),
  shape: oneOf(['circle', 'square']),
}

AvatarButton.defaultProps = {
  size: 24,
  shape: 'square',
}

export default AvatarButton
