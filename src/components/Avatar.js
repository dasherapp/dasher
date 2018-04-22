import React from 'react'
import { oneOfType, string, number } from 'prop-types'
import glamorous from 'glamorous'

import { radii } from '../theme'

const Avatar = glamorous.img(props => ({
  width: props.size,
  height: props.size,
  borderRadius: radii[0],
  alt: props.alt,
}))

Avatar.propTypes = {
  src: string.isRequired,
  size: oneOfType([string, number]),
}

Avatar.defaultProps = {
  size: 24,
}

export default Avatar
