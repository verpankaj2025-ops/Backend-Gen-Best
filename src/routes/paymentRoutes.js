import express from "express"
import { createOrder } from "../services/razorpayService.js"

const router = express.Router()

router.post("/create-order", async (req, res) => {
  const { amount, email } = req.body
  const order = await createOrder(amount, email)
  res.json(order)
})

export default router
