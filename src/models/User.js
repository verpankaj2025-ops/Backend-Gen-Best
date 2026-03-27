import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  tenantId: String,

  role: { type: String, default: "user" },

  subscription: {
    status: { type: String, default: "inactive" },
    plan: { type: String, default: "basic" }
  }

}, { timestamps: true })

export default mongoose.model("User", userSchema)
