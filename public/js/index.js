var socket = io()

socket.on('connect', function(){
  console.log('Server connected')
})

socket.on('disconnect', function(){
  console.log('Server disconnect')
})

socket.on('newMessage', message => {
  var list = $('<li></li>').text(`${message.from}: ${message.text}`)
  $('#chat-list').append(list)
})

socket.on('newLocationMessage', message => {
  var list = $('<li></li>').text(`${message.from}: `)
  var link = $('<a target="_blank">See my location</a>').attr('href', message.url)
  list.append(link)
  $('#chat-list').append(list)
})

$('#chat-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('input[name=message]').val()
  })
})

$('#send-location').click(function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('Unable to fetch location.')
  })
})