export const sortByDate = (items, direction) => {
  const comparator =
    direction === 'asc'
      ? (a, b) => (a.created < b.created ? -1 : 1)
      : (a, b) => (a.created > b.created ? -1 : 1)

  return [...items].sort(comparator)
}
