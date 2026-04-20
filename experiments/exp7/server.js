const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

let connectedUsers = 0;

io.on("connection", (socket) => {
  connectedUsers++;
  console.log(`[+] User connected (${socket.id}). Total online: ${connectedUsers}`);

  // Send a welcome message when someone connects
  setTimeout(() => {
     socket.emit("receiveMessage", { 
         sender: "Bot", 
         text: "Hi there! I'm a demo bot. Ask me anything!" 
     });
  }, 500);

  socket.on("sendMessage", (message) => {
    console.log(`[MSG] from ${socket.id}: ${message}`);
    
    // Echo the user message back to them immediately
    socket.emit("receiveMessage", { sender: "User", text: message });

    // Generate a simple simulated bot reply based on input keywords
    setTimeout(() => {
        let replyText = "";
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
            replyText = "Hello! How can I help you today?";
        } else if (lowerMsg.includes("help")) {
            replyText = "I'm a simple bot. I don't have many features yet, but I'm learning!";
        } else if (lowerMsg.includes("bye")) {
            replyText = "Goodbye! Have a great day!";
        } else {
            replyText = `You said: "${message}". That's interesting!`;
        }

        socket.emit("receiveMessage", { sender: "Bot", text: replyText });
    }, 800 + Math.random() * 1000); // Random delay for realism
  });

  socket.on("disconnect", () => {
    connectedUsers--;
    console.log(`[-] User disconnected (${socket.id}). Total online: ${connectedUsers}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Exp7 Chat Server is active on port ${PORT}`);
});
