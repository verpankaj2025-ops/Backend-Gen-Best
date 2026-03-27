import { generateReply } from "../../services/aiService.js"
import { sendWhatsApp } from "../../services/whatsappService.js"

export const handleNewLead = async (lead) => {
  const reply = await generateReply(lead)
  await sendWhatsApp(lead.phone, reply)

  console.log("🤖 Automation triggered for:", lead.phone)
}
