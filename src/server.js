import http from "http"
import app from "./app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { initSocket } from "./socket.js"

dotenv.config()

const server = http.createServer(app)

initSocket(server)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(console.error)

server.listen(5000, () => {
  console.log("🚀 Server running on 5000")
})
