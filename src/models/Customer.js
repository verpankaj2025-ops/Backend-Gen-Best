import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  name: String,
  visits: { type: Number, default: 1 },
  lastMessage: String
}, { timestamps: true })

export default mongoose.model("Customer", customerSchema)
