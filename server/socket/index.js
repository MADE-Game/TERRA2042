const IO = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

const GAMENSP = gameNsp => {
  gameNsp.on('connection', socket => {
    gameNsp.to(socket.id).emit('welcome')
    console.log(`A socket connection to games has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the lobby`)
    })

    socket.on('play card', data => {
      gameNsp.emit('play card', data)
    })

    socket.on('attack', data => {
      gameNsp.emit('attack', data)
    })

    socket.on('draw card', () => {
      gameNsp.emit('draw card')
    })

    socket.on('join', data => {
      socket.join(`room${data.id}`)
      // sends to all users in "room${data.id}" except sender
      // to include sender, use the .in method
      gameNsp.to(socket.id).emit('join', data)
    })

    socket.on('send msg', data => {
      gameNsp.emit('send msg', data)
    })
  })
}

module.exports = {
  IO,
  GAMENSP
}
