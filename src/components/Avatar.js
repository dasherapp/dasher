import { oneOfType, oneOf, string, number } from 'prop-types'
import styled from 'react-emotion'

import { radii } from '../theme'
import { cleanElement } from '../utils/utils'

const Avatar = styled(
  cleanElement({ type: 'img', excludeProps: ['size', 'shape'] }),
)(props => ({
  width: props.size,
  height: props.size,
  borderRadius: props.shape === 'square' ? radii[0] : '50%',
  verticalAlign: 'middle',
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
