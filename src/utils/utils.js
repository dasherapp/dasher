export const get = (path, object) =>
  path.reduce(
    (acc, property) => (acc && acc[property] ? acc[property] : null),
    object,
  )

export const reorder = (list, from, to) => {
  const listCopy = [...list]
  const [removed] = listCopy.splice(from, 1)
  listCopy.splice(to, 0, removed)
  return listCopy
}
