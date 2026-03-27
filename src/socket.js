import { Server } from "socket.io"

let io = null

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" }
  })

  io.on("connection", (socket) => {
    console.log("⚡ Client connected")
  })
}

export const getIO = () => io
