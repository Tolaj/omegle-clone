// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const cors = require('cors');
const { Server: SocketIOServer } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: 'http://localhost:8081', // adjust this to match your Next.js app's origin
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.join("PC2");
   // Handle signaling for multiple peers
   socket.on('signal', (data) => {
    io.to(data.target).emit('signal', {
      sender: socket.id,
      signal: data.signal,
    });
  });
  
  socket.on('joinRoom', ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`${username} joined room ${roomId}`);
    io.to(roomId).emit('message', { user: 'admin', text: `${username} has joined the room` });
    
  });
  

  socket.on('sendMessage', ({ roomId, message, username }) => {
    io.to(roomId).emit('message', { user: username, text: message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
