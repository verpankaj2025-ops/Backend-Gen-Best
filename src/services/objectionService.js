export const handleObjection = (text, type) => {
  text = text.toLowerCase()
  const price = type === "repeat" ? 999 : 1499

  if (text.includes("mehnga") || text.includes("expensive")) {
    return `😊 Sir samajh sakte hain, lekin ye premium therapy hai.

Aaj ₹${price} pe special offer chal raha hai (limited time) 🔥

👉 Aap ek session try kar lo, difference khud feel karoge.`
  }

  if (text.includes("sochunga") || text.includes("later")) {
    return `👍 Sure sir, lekin aaj ka offer kal nahi milega 😮

Slots fast fill ho rahe hain.

👉 Main aapka slot temporarily block kar du?`
  }

  if (text.includes("busy")) {
    return `⏰ No problem sir!

Hum flexible timings dete hain — evening / weekend bhi available 😊

👉 Aapko kaunsa time suit karega?`
  }

  if (text.includes("location")) {
    return `📍 Sir Gomti Nagar, Lucknow me hai.

Easy parking + premium setup 😊

👉 Aap visit plan karna chahenge?`
  }

  return null
}
