import express from "express"
import Chat from "../models/Chat.js"
import { identifyCustomer } from "../services/crmService.js"
import { messageQueue } from "../queues/messageQueue.js"
import { isDuplicate } from "../utils/messageFilter.js"
import { getIO } from "../socket.js"

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

    if (!msg) return res.sendStatus(200)

    const messageId = msg.id
    if (isDuplicate(messageId)) {
      console.log("⚠️ Duplicate skipped")
      return res.sendStatus(200)
    }

    const phone = msg.from
    const text = msg.text?.body || ""

    console.log("📩 Incoming:", phone, text)

    const { type } = await identifyCustomer(phone, text)

    // 💾 save user msg
    const userMsg = await Chat.create({
      phone,
      message: text,
      from: "user",
      tenantId: type
    })

    getIO()?.emit("new_message", userMsg)

    // 🚀 ADD TO QUEUE
    await messageQueue.add("process_message", { tenantId: type,
      phone,
      text,
      type
    }, {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 }
    })

    res.sendStatus(200)
  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err)
    res.sendStatus(500)
  }
})

export default router
