import omit from 'lodash/fp/omit'
import { mapProps } from 'recompose'

export function get(path, object) {
  return path.reduce(
    (acc, property) => (acc && acc[property] ? acc[property] : null),
    object,
  )
}

export function reorder(list, from, to) {
  const listCopy = [...list]
  const [removed] = listCopy.splice(from, 1)
  listCopy.splice(to, 0, removed)
  return listCopy
}

export function omitProps(keys) {
  return mapProps(props => omit(keys, props))
}
