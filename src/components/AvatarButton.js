import { func, number, oneOf, oneOfType, string } from 'prop-types'
import React from 'react'
import { radii } from '../theme'
import Avatar from './Avatar'
import Clickable from './Clickable'

const AvatarButton = React.forwardRef(({ src, size, shape, ...props }, ref) => {
  return (
    <Clickable
      innerRef={ref}
      css={{
        borderRadius: shape === 'square' ? radii[1] : '50%',
      }}
      {...props}
    >
      <Avatar src={src} size={size} shape={shape} />
    </Clickable>
  )
})

AvatarButton.propTypes = {
  src: string.isRequired,
  size: oneOfType([string, number]),
  shape: oneOf(['circle', 'square']),
  onClick: func,
}

AvatarButton.defaultProps = {
  size: 24,
  shape: 'square',
  onClick: () => {},
}

export default AvatarButton
