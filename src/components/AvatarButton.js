import React from 'react'
import { oneOfType, oneOf, string, number } from 'prop-types'
import glamorous from 'glamorous'

import Avatar from './Avatar'

const UnstyledButton = glamorous.button({
  display: 'inline-block',
  margin: 0,
  padding: 0,
  lineHeight: 0,
  background: 'transparent',
  border: 0,
  outline: 0,
  cursor: 'pointer',
})

const AvatarButton = React.forwardRef(({ src, size, shape, ...props }, ref) => {
  return (
    <UnstyledButton innerRef={ref} {...props}>
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
