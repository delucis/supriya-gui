const port = process.env.PORT || 8888;
const express = require('express');
const server = express();
var http = require('http').createServer(server);

server.use('/dist', express.static('dist'));

server.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
