const path = require('path')
const express = require('express')
const sockerIO = require('socket.io')
const http = require('http')
const app = express()
const publicPath = path.join(__dirname, '../public')
const server = http.createServer(app)
const io = sockerIO(server)
const { generateMessage, generateLocationMessage } = require('../server/utils/message')

io.on('connection', socket => {
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'))
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))
  socket.on('createMessage', message => {
    // io.emit emit for all the connections.
    io.emit('newMessage', generateMessage(message.from, message.text))
  })
  socket.on('createLocationMessage', ({ latitude, longitude }) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', latitude, longitude))
  })
  socket.on('disconnect', () => {
    console.log('User has been disconnected')
  })
})

app.use(express.static(publicPath))
server.listen(3000, () => {
  console.log('------ Server is up on port 3000 ------')
})