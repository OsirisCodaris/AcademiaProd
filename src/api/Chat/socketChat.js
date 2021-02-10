module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected')
    io.emit('chat message', `<<BOT>> HELLO: ${socket.id}`)

    socket.on('chat message', (msg) => {
      io.emit('chat message', `Server forward: ${msg}`)
    })
  })
}
