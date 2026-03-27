const processed = new Set()

export const isDuplicate = (id) => {
  if (!id) return false

  if (processed.has(id)) return true

  processed.add(id)

  setTimeout(() => processed.delete(id), 60000) // 1 min

  return false
}
