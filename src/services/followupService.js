import { sendWhatsApp } from "./whatsappService.js"

export const scheduleFollowUp = (phone) => {
  setTimeout(() => {
    sendWhatsApp(phone, "⏳ Sir your booking is pending. Limited slots left!")
  }, 600000) // 10 min
}
