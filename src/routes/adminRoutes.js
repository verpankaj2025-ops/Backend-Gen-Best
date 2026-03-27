import express from "express"
import User from "../models/User.js"
import { protect } from "../middleware/authMiddleware.js"
import { isAdmin } from "../middleware/adminMiddleware.js"

const router = express.Router()

// all users
router.get("/users", protect, isAdmin, async (req, res) => {
  const users = await User.find()
  res.json(users)
})

// activate subscription
router.post("/activate", protect, isAdmin, async (req, res) => {
  const { userId } = req.body

  await User.findByIdAndUpdate(userId, {
    subscription: { status: "active", plan: "pro" }
  })

  res.json({ msg: "Activated" })
})

export default router
