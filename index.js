const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "https://starlit-tapioca-f08207.netlify.app"//"http://localhost:5173"
        //origin: "http://localhost:5173"
      }
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('keep-alive', (msg) => {
    io.emit('keep-alive', msg);
  });
  socket.on('adminStep', (value) => {
    io.emit('adminStep', value);
  });
  socket.on('who', (msg) => {
    io.emit('who', msg);
  });
});

server.listen(3310, () => {
  console.log('socket running');
});