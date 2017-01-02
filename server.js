const port = process.env.PORT || 8888;
const express = require('express');
const server = express();
var http = require('http').createServer(server);
var io = require('socket.io').listen(http);

server.use('/dist', express.static('dist'));

server.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('New socket connected.');
  socket.on('disconnect', function () {
    console.log('A socket disconnnected.');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
