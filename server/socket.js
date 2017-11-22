const server = require('./server.js').server;
const io = require('socket.io').listen(server)

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('connected', (username) => {
    console.log(username)
    socket.broadcast.emit('user', username)
  })

  socket.on('send', (contentState) => {
    console.log('Sending back editorState', contentState)
    io.emit('receive', contentState)
  })
})
