export const getLeadScore = (text) => {
  text = text.toLowerCase()

  if (text.includes("book") || text.includes("confirm")) return "hot"
  if (text.includes("price")) return "warm"

  return "cold"
}
