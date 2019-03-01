var socket = io()

socket.on('connect', function(){
  console.log('Server connected')
})

socket.on('disconnect', function(){
  console.log('Server disconnect')
})

socket.on('newMessage', message => {
  const formatedTime = moment(message.createdAt).format('h:mm a')
  var list = $('<p class="chat_message-p"></p>').text(`${message.from} ${formatedTime}: ${message.text}`)
  $('#chat-list').append(list)
})

socket.on('newLocationMessage', message => {
  const formatedTime = moment(message.createdAt).format('h:mm a')
  var list = $('<p class="chat_message-p"></p>').text(`${message.from} ${formatedTime}: `)
  var link = $('<a target="_blank">See my location</a>').attr('href', message.url)
  list.append(link)
  $('#chat-list').append(list)
})

$('#chat-form').on('submit', function(e) {
  e.preventDefault();
  var text = $('input[name=message]')
  if (text.val() !== '') {
    $('.chat__button-submit').attr('disabled', true)
    socket.emit('createMessage', {
      from: 'User',
      text: text.val()
    }, function () {
      text.val('')
      $('.chat__button-submit').attr('disabled', false)
    })
  }
}) 

$('#send-location').click(function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }
  $('.chat__button-location').attr('disabled', true).text('Sending location')
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function () {
      $('.chat__button-location').attr('disabled', false).text('Send location')
    })
  }, function () {
    alert('Unable to fetch location.')
    $('.chat__button-location').attr('disabled', false)
  })
})