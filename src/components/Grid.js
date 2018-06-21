import { number, oneOfType, string } from 'prop-types'
import system from 'system-components/emotion'
import { toPx } from '../utils/style'

const Grid = system(
  {
    is: 'div',
    display: 'grid',
    alignItems: 'stretch',
    gridGap: 4,
  },
  props => ({
    gridTemplateColumns: `repeat(auto-fit, minmax(${toPx(
      props.maxColumnWidth,
    )}, 1fr))`,
  }),
)

Grid.displayName = 'Grid'

Grid.propTypes.maxColumnWidth = oneOfType([number, string]).isRequired

export default Grid
