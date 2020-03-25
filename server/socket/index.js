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
    console.log(`A socket connection to games has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the lobby`)
    })

    socket.on('join', data => {
      socket.join(`room${data.roomId}`)
      gameNsp.to(socket.id).emit('join', {
        numPpl: gameNsp.adapter.rooms[`room${data.roomId}`].length
      })
    })

    socket.on('id exchange', data => {
      socket.to(`room${data.roomId}`).emit('id exchange', data)
    })

    socket.on('game started', data => {
      socket.to(`room${data.roomId}`).emit('game started', data)
    })

    socket.on('play card', data => {
      socket.to('room1').emit('play card', data)
    })

    socket.on('attack', data => {
      socket.to('room1').emit('attack', data)
    })

    socket.on('draw card', () => {
      socket.to('room1').emit('draw card')
    })

    socket.on('send msg', data => {
      gameNsp.in('room1').emit('send msg', data)
    })
  })
}

module.exports = {
  IO,
  GAMENSP
}
