export const mergeUniqueById = (prev, next) =>
  Object.values(
    [...prev, ...next].reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {}),
  )
