export const get = (path, object) =>
  path.reduce(
    (acc, property) => (acc && acc[property] ? acc[property] : null),
    object,
  )
