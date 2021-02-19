const { getUsers, users } = require('./usersOnline')
const ResponseService = require('../../services/ResponseService')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected')
    // io.emit('chat message', `<<BOT>> HELLO: ${socket.id}`)

    socket.on('join_forum', (data) => {
      // data:{idusers, idproblems}
      const user = {}
      let newuser = true
      user[socket.id] = data.idusers
      if (users[data.idproblems]) {
        if (getUsers(users[data.idproblems]).includes(data.idusers)) {
          const index = getUsers(users[data.idproblems]).indexOf(data.idusers)
          delete users[data.idproblems][index]
          newuser = false
        }

        users[data.idproblems].push(user)
      } else {
        users[data.idproblems] = [user]
      }

      console.log(users[data.idproblems])
      users[data.idproblems] = users[data.idproblems].filter((el) => el)
      console.log(users[data.idproblems])
      // Joining the Socket Room
      if (newuser) {
        console.log('have join')
        socket.join(data.idproblems)
      }
      // Send online users array
      io.to(data.idproblems).emit(
        'online-users',
        getUsers(users[data.idproblems])
      )
    })
    socket.on('typing', (data) => {
      console.log(`${data.username} is typing`)
      socket.broadcast.to(data.idproblems).emit('typing', data.username)
    })

    socket.on('send_response', async (data) => {
      const response = await ResponseService.showById(data.idresponses)
      socket.broadcast.to(data.idproblems).emit('receive_response', response)
      console.log(`new message has send ${response.toString()}`)
    })
    // Remove user from memory when they disconnect
    socket.on('disconnecting', () => {
      console.log('disconnecting')
      const rooms = Object.keys(socket.rooms)

      const socketId = rooms[1]
      const roomname = rooms[0]
      if (users[roomname]) {
        users[roomname].forEach((user, index) => {
          if (user[socketId]) {
            users[roomname].splice(index, 1)
          }
        })
      }

      // Send online users array
      io.to(roomname).emit('online-users', getUsers(users[roomname]))
    })
  })
}
