import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
  phone: String,
  message: String,
  from: String, // user / bot
  tenantId: String
}, { timestamps: true })

export default mongoose.model("Chat", chatSchema)
