const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socket = io('https://simple-chat-mu.vercel.app/');

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  socket.on('message', data => {
    const { username, message } = data;
    const chatMessage = { sender: username, message: message };
    io.emit('message', chatMessage);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
