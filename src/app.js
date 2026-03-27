import cors from "cors";
import dotenv from "dotenv"; dotenv.config();
import express from "express"
import mongoose from "mongoose"
import leadRoutes from "./routes/leadRoutes.js"
import webhookRoutes from "./routes/webhook.js"

const app = express()
app.use(cors())


app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/cloudcrm")
.then(() => console.log("✅ MongoDB Connected"))

app.get("/", (req, res) => {
  res.send("API Running 🚀")
})

app.use("/api/leads", leadRoutes)
app.use("/webhook", webhookRoutes)

import paymentRoutes from "./routes/paymentRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

app.use("/api/payment", paymentRoutes)
app.use("/api/dashboard", dashboardRoutes)

import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

import adminRoutes from "./routes/adminRoutes.js";
app.use("/api/admin", adminRoutes);

import paymentWebhook from "./routes/paymentWebhook.js";
app.use("/webhook/payment", paymentWebhook);

import chatRoutes from "./routes/chatRoutes.js";
app.use("/api/chat", chatRoutes);
import settingsRoutes from "./routes/settingsRoutes.js";
app.use("/api/settings", settingsRoutes);

export default app
