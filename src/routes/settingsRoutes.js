import { clearCache } from "../services/aiService.js";
import express from "express"
import Settings from "../models/Settings.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// GET settings
router.get("/", protect, async (req, res) => {
  let settings = await Settings.findOne({ tenantId: req.user.tenantId })

  if (!settings) {
    settings = await Settings.create({
      tenantId: req.user.tenantId,
      keywords: {
        price: ["price", "kitna"],
        offer: ["offer", "discount"],
        booking: ["book", "confirm"]
      }
    })
  }

  clearCache();
  res.json(settings)
})

// UPDATE settings
router.post("/", protect, async (req, res) => {
  const { keywords, pricing } = req.body

  const settings = await Settings.findOneAndUpdate(
    { tenantId: req.user.tenantId },
    { keywords, pricing },
    { upsert: true, new: true }
  )

  clearCache();
  res.json(settings)
})

export default router
