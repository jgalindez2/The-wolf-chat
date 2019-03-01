var socket = io()

function scrollToBottom () {
  var messagesContainer = $('.chat__messages')
  var newMessage = messagesContainer.children('div:last-child')
  var scrollHeight = messagesContainer.prop('scrollHeight')
  var scrollTop = messagesContainer.prop('scrollTop')
  var clientHeight = messagesContainer.prop('clientHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()
  if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messagesContainer.animate({ scrollTop: scrollHeight }, 600)
  }
}

socket.on('connect', function(){
  console.log('Server connected')
})

socket.on('disconnect', function(){
  console.log('Server disconnect')
})

socket.on('newMessage', message => {
  const formatedTime = moment(message.createdAt).format('h:mm a')
  const newMessageTemplate = $('#new-message-template').html()
  Mustache.parse(newMessageTemplate);
  var rendered = Mustache.render(newMessageTemplate, {
    from: message.from,
    text: message.text,
    createdAt: formatedTime
  })
  $('#chat-list').append(rendered)
  scrollToBottom()
})

socket.on('newLocationMessage', message => {
  const formatedTime = moment(message.createdAt).format('h:mm a')
  const newMessageTemplate = $('#new-message-template').html()
  Mustache.parse(newMessageTemplate);
  var rendered = Mustache.render(newMessageTemplate, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  })
  $('#chat-list').append(rendered)
  scrollToBottom()
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