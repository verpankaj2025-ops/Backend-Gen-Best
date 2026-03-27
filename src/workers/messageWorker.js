import { Worker } from "bullmq"
import redis from "../config/redis.js"
import { generateAIReply } from "../services/aiService.js"
import { sendWhatsApp } from "../services/whatsappService.js"
import Chat from "../models/Chat.js"
import { getIO } from "../socket.js"

const worker = new Worker(
  "messages",
  async (job) => {
    const { phone, text, type, tenantId } = job.data

    console.log("⚙️ Processing:", phone, text)

    // 🤖 AI reply
    const reply = await generateAIReply(text, type, tenantId)

    // 💾 save bot msg
    const botMsg = await Chat.create({
      phone,
      message: reply,
      from: "bot",
      tenantId: type
    })

    // 📡 real-time push
    getIO()?.emit("new_message", botMsg)

    // 📲 send WhatsApp
    await sendWhatsApp(phone, reply)

    console.log("✅ Done:", phone)
  },
  {
    connection: redis,
    concurrency: 5
  }
)

console.log("🚀 Worker started")
