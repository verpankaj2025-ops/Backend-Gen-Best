import { sendWhatsApp } from "./whatsappService.js"

export const persuasionFlow = (phone) => {
  // 1st follow-up (5 min)
  setTimeout(() => {
    sendWhatsApp(phone, "😮 Sir slots fast fill ho rahe hain, aaj ka offer miss ho sakta hai!")
  }, 300000)

  // 2nd follow-up (15 min)
  setTimeout(() => {
    sendWhatsApp(phone, "🔥 Last reminder: Aaj 20% OFF chal raha hai. Book karna hai to bataiye.")
  }, 900000)
}
