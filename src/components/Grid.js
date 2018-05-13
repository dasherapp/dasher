import { number, oneOfType, string } from 'prop-types'
import styled from 'react-emotion'
import { spacing } from '../theme'
import { toPx } from '../utils/style'

const Grid = styled.div(props => ({
  display: 'grid',
  alignItems: props.align,
  gridGap: props.gap,
  gridTemplateColumns: `repeat(auto-fit, minmax(${toPx(props.width)}, 1fr))`,
}))

Grid.propTypes = {
  width: oneOfType([number, string]).isRequired,
  align: string,
  gap: oneOfType([number, string]),
}

Grid.defaultProps = {
  align: 'stretch',
  gap: spacing[3],
}

export default Grid
