import OpenAI from "openai"
import dotenv from "dotenv"
import Settings from "../models/Settings.js"

dotenv.config()

let client = null

const getClient = () => {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }
  return client
}

// 🔥 CACHE
const cache = new Map()

export const clearCache = () => {
  cache.clear()
}

// 🔥 dynamic intent detection
const detectIntent = (text, settings) => {
  text = text.toLowerCase()

  if (settings?.keywords?.price?.some(k => text.includes(k))) return "price"
  if (settings?.keywords?.offer?.some(k => text.includes(k))) return "offer"
  if (settings?.keywords?.booking?.some(k => text.includes(k))) return "booking"

  return "general"
}

export const generateAIReply = async (message, type, tenantId) => {

  const key = message.toLowerCase()
  if (cache.has(key)) return cache.get(key)

  const settings = await Settings.findOne({ tenantId })

  const intent = detectIntent(message, settings)

  const price = settings?.pricing?.[type] || 1499

  const replyMap = {
    price: `💆‍♂️ Sir price ₹${price} se start hai 😊`,
    offer: `🎁 Sir aaj special offer chal raha hai!`,
    booking: `👉 CONFIRM likh dijiye, slot reserve kar deta hu.`,
    general: `😊 Sir aap booking karna chahenge?`
  }

  const reply = replyMap[intent] || replyMap.general

  cache.set(key, reply)

  return reply
}
