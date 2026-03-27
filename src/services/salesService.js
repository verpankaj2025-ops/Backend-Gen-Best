export const salesReply = (intent, type) => {
  const price = type === "repeat" ? 999 : 1499

  const scripts = {
    price: `💆‍♂️ Sir price ₹${price} se start hai 😊
Aaj special discount chal raha hai.

👉 Aapke liye slot block kar du?`,

    offer: `🎁 Sir aaj flat 20% OFF chal raha hai!

Slots fast fill ho rahe hain 😮
👉 Aapka booking confirm kar du?`,

    booking: `🗓️ Sir aaj ke liye limited slots bache hain!

👉 CONFIRM likh dijiye, main aapka slot reserve kar deta hu.`,

    general: `😊 Sir hum premium spa services provide karte hain.

Aap relax session book karna chahenge?`
  }

  return scripts[intent] || scripts.general
}
