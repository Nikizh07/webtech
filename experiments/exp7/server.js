const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (message) => {
    // Echo the user message
    io.emit("receiveMessage", { sender: "User", text: message });

    // Simulated bot reply
    setTimeout(() => {
      let reply = "Hello! I am a simple bot. You said: " + message;
      io.emit("receiveMessage", { sender: "Bot", text: reply });
    }, 1000);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Exp7 Chat server running on port ${PORT}`));
