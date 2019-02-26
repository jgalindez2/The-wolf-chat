const path = require('path')
const express = require('express')
const sockerIO = require('socket.io')
const http = require('http')
const app = express()
const publicPath = path.join(__dirname, '../public')
const server = http.createServer(app)
const io = sockerIO(server)

io.on('connection', socket => {
  console.log('New user connected')
  socket.on('disconnect', () => {
    console.log('User has been disconnected')
  })
  socket.on('createMessage', message => {
    console.log('Message created:', message)
  })

  socket.emit('newMessage', {
    from: 'Awer',
    message: 'See you ...',
    createdAt: 12344
  })
})

app.use(express.static(publicPath))
server.listen(3000, () => {
  console.log('------ Server is up on port 3000 ------')
})