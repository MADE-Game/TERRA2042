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

    socket.on('join', data => {
      socket.join(`room${data.roomId}`)
      // if (gameNsp.adapter.rooms[`room${data.roomId}`].length > 2) {
      //   gameNsp.to(socket.id).emit('full', {roomId: data.roomId})
      // } else {
      id = data.roomId
      if (gameNsp.adapter.rooms[`room${data.roomId}`].length === 1) {
        gameNsp.adapter.rooms[`room${data.roomId}`].host = socket.id
      }

      gameNsp.to(socket.id).emit('join', {
        numPpl: gameNsp.adapter.rooms[`room${data.roomId}`].length
      })
      // }
      socket.to(`room${id}`).emit('rejoined game', data)
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
      socket.to(`room${id}`).emit('left game', data)
    })

    socket.on('move made', () => {
      socket.to(`room${id}`).emit('move made')
    })

    socket.on('play card', data => {
      socket.to(`room${id}`).emit('play card', data)
    })

    socket.on('attack', data => {
      socket.to(`room${id}`).emit('attack', data)
    })

    socket.on('draw card', () => {
      socket.to(`room${id}`).emit('draw card')
    })

    socket.on('send msg', data => {
      gameNsp.in(`room${id}`).emit('send msg', data)
    })

    socket.on('end turn', () => {
      socket.to(`room${id}`).emit('end turn')
    })

    socket.on('game over', () => {
      gameNsp.in(`room${id}`).emit('game over')
    })
  })
}

module.exports = {
  IO,
  GAMENSP
}
