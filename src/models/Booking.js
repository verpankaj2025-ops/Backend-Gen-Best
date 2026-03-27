import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  phone: String,
  amount: Number,
  status: { type: String, default: "pending" },
  tenantId: String
}, { timestamps: true })

export default mongoose.model("Booking", bookingSchema)
