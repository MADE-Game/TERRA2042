const IO = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

const GAMENSP = gameNsp => {
  let id
  gameNsp.on('connection', socket => {
    console.log(`A socket connection to games has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the lobby`)
    })

    // handles a player's initial join
    socket.on('join', data => {
      socket.join(`room${data.roomId}`)

      id = data.roomId
      if (gameNsp.adapter.rooms[`room${data.roomId}`].length === 1) {
        gameNsp.adapter.rooms[`room${data.roomId}`].host = socket.id
      }

      gameNsp.to(socket.id).emit('join', {
        numPpl: gameNsp.adapter.rooms[`room${data.roomId}`].length
      })
    })

    // handles a player rejoining a game
    socket.on('player joined', data => {
      socket.to(`room${data.roomId}`).emit('player joined', data)
    })

    socket.on('id exchange', data => {
      socket.to(`room${data.roomId}`).emit('id exchange', {
        ...data,
        host: gameNsp.adapter.rooms[`room${data.roomId}`].host
      })
    })

    socket.on('game started', data => {
      socket.to(`room${data.roomId}`).emit('game started', data)
    })

    socket.on('left game', data => {
      socket.to(`room${data.roomId}`).emit('left game', data)
    })

    socket.on('play card', data => {
      socket.to(`room${data.roomId}`).emit('play card', data)
    })

    socket.on('attack', data => {
      socket.to(`room${data.roomId}`).emit('attack', data)
    })

    socket.on('draw card', data => {
      socket.to(`room${data.roomId}`).emit('draw card')
    })

    socket.on('hero attacked', data => {
      socket.to(`room${data.roomId}`).emit('hero attacked')
    })

    socket.on('send msg', data => {
      gameNsp.in(`room${data.roomId}`).emit('send msg', data)
      socket.to(`room${data.roomId}`).emit('alert chat')
    })

    socket.on('end turn', data => {
      socket.to(`room${data.roomId}`).emit('end turn')
    })

    socket.on('game over', data => {
      gameNsp.in(`room${data.roomId}`).emit('game over', data.winner)
    })
  })
}

module.exports = {
  IO,
  GAMENSP
}
