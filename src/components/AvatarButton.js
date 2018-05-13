import React from 'react'
import { oneOfType, oneOf, string, number, func } from 'prop-types'

import { radii } from '../theme'
import Clickable from './Clickable'
import Avatar from './Avatar'

const AvatarButton = React.forwardRef(({ src, size, shape, ...props }, ref) => {
  return (
    <Clickable
      innerRef={ref}
      css={{
        borderRadius: shape === 'square' ? radii[0] : '50%',
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
