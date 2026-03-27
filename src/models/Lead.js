import mongoose from "mongoose"

const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  source: String,
  status: { type: String, default: "new" },
  tenantId: String
}, { timestamps: true })

export default mongoose.model("Lead", leadSchema)
