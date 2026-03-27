import express from "express"
import crypto from "crypto"
import User from "../models/User.js"

const router = express.Router()

router.post("/razorpay", async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET

    const shasum = crypto.createHmac("sha256", secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex")

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ msg: "Invalid signature" })
    }

    const event = req.body.event

    if (event === "payment.captured") {
      const email = req.body.payload.payment.entity.notes?.email

      if (email) {
        await User.findOneAndUpdate(
          { email },
          { subscription: { status: "active", plan: "pro" } }
        )

        console.log("💰 Subscription Activated:", email)
      }
    }

    res.json({ status: "ok" })
  } catch (err) {
    console.error(err)
    res.status(500).send("error")
  }
})

export default router
