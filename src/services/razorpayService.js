import Razorpay from "razorpay"
import dotenv from "dotenv"

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
})

export const createOrder = async (amount, email) => {
  return await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    notes: { email }
  })
}
