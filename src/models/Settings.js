import mongoose from "mongoose"

const settingsSchema = new mongoose.Schema({
  tenantId: String,

  keywords: {
    price: [String],
    offer: [String],
    booking: [String]
  },

  pricing: {
    new: { type: Number, default: 1499 },
    repeat: { type: Number, default: 999 }
  }

}, { timestamps: true })

export default mongoose.model("Settings", settingsSchema)
