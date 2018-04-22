import { oneOfType, oneOf, string, number } from 'prop-types'
import glamorous from 'glamorous'

import { radii } from '../theme'

const Avatar = glamorous.img(props => ({
  width: props.size,
  height: props.size,
  borderRadius: props.shape === 'square' ? radii[0] : '50%',
}))

Avatar.propTypes = {
  src: string.isRequired,
  size: oneOfType([string, number]),
  shape: oneOf(['circle', 'square']),
}

Avatar.defaultProps = {
  size: 24,
  shape: 'square',
}

export default Avatar
