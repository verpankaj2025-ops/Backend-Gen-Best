import express from "express"
import Chat from "../models/Chat.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// contacts list (optimized)
router.get("/", protect, async (req, res) => {
  const contacts = await Chat.aggregate([
    { $match: { tenantId: req.user.tenantId } },
    {
      $group: {
        _id: "$phone",
        lastMessage: { $last: "$message" }
      }
    }
  ])

  res.json(contacts)
})

// chat messages (optimized)
router.get("/:phone", protect, async (req, res) => {
  const chats = await Chat.find({
    phone: req.params.phone,
    tenantId: req.user.tenantId
  })
    .sort({ createdAt: 1 })
    .lean()

  res.json(chats)
})

export default router
