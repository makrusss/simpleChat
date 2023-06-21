const express = require('express');
const cors = require('cors'); // Import the cors module
const app = express();
const https = require('http').createServer(app);
const io = require('socket.io')(https); // Fix the socket initialization

app.use(cors()); // Enable CORS for all routes
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

