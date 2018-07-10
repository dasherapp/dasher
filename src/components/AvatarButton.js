import { number, oneOfType, string } from 'prop-types'
import React from 'react'
import Avatar from './Avatar'
import Clickable from './Clickable'

const AvatarButton = React.forwardRef(({ src, size, ...props }, ref) => {
  return (
    <Clickable innerRef={ref} borderRadius={2} {...props}>
      <Avatar src={src} size={size} />
    </Clickable>
  )
})

AvatarButton.propTypes = {
  src: string.isRequired,
  size: oneOfType([string, number]),
}

AvatarButton.defaultProps = {
  size: 24,
}

export default AvatarButton
