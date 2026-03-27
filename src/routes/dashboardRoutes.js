import express from "express"
import Lead from "../models/Lead.js"
import Booking from "../models/Booking.js"
import { protect } from "../middleware/authMiddleware.js"
import { checkSubscription } from "../middleware/subscriptionMiddleware.js"

const router = express.Router()

router.get("/stats", protect, checkSubscription, async (req, res) => {
  const tenantId = req.user.tenantId

  const totalLeads = await Lead.countDocuments({ tenantId })
  const bookings = await Booking.countDocuments({ tenantId })

  const revenue = await Booking.aggregate([
    { $match: { tenantId, status: "paid" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ])

  res.json({
    totalLeads,
    bookings,
    revenue: revenue[0]?.total || 0
  })
})

export default router
