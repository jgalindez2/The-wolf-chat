var socket = io()
socket.on('connect', function(){
  console.log('Server connected')
})

socket.on('disconnect', function(){
  console.log('Server disconnect')
})

socket.on('newMessage', message => {
  console.log('New message', message)
})