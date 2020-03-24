import io from 'socket.io-client'

const mainSocket = io(window.location.origin)

mainSocket.on('connect', () => {
  console.log('Connected!')
})

export default mainSocket
