const server = require('./server.js').server;
const io = require('socket.io').listen(server)

io.on('connection', (socket) => {
  console.log('User Connected');

  socket.on('connected', (username) => {
    socket.broadcast.emit('user', username);
  })

  socket.on('send', (contentState) => {
    io.emit('receive', contentState);
  })
})
