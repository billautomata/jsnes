var express = require('express')

var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

var port = 60000
module.exports = server.listen(port, '0.0.0.0', function () {

  app.use('/local-roms', express.static('local-roms'))
  app.use('/', express.static('client_application'))
  console.log(['listening', port].join(' '))
})

var all_sockets = []

io.on('connection', function (socket) {
  console.log('connection')
  all_sockets.push(socket)

  socket.on('disconnect', function(){
    all_sockets = all_sockets.filter(function(o){ return o !== socket })
  })
})
