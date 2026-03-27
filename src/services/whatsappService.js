import fetch from "node-fetch"

export const sendWhatsApp = async (phone, message) => {
  const TOKEN = process.env.WHATSAPP_TOKEN
  const PHONE_ID = process.env.WHATSAPP_PHONE_ID

  console.log("🔑 TOKEN:", TOKEN?.slice(0,20))
  console.log("📱 PHONE_ID:", PHONE_ID)

  try {
    const res = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message }
      })
    })

    const data = await res.json()

    console.log("📊 RESPONSE:", JSON.stringify(data, null, 2))

  } catch (err) {
    console.error("❌ ERROR:", err.message)
  }
}
