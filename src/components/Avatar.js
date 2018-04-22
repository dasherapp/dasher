import React from 'react'
import { oneOfType, string, number } from 'prop-types'
import glamorous from 'glamorous'

import { radii } from '../theme'

const AvatarContainer = glamorous.img(props => ({
  width: props.size,
  height: props.size,
  borderRadius: radii[0],
  alt: props.alt,
}))

const Avatar = props => <AvatarContainer {...props} />

Avatar.propTypes = {
  /** The avatar image URL. */
  src: string.isRequired,
  /** Alternate text if image cannot be displayed */
  alt: string.isRequired,
  /**
   * The width and height of the avatar.
   * A number will be interpreted as a pixel value.
   * Use a string to specify other units (e.g. "2em").
   * */
  size: oneOfType([string, number]),
}

Avatar.defaultProps = {
  size: 24,
}

export default Avatar
