const port = process.env.PORT || 8888;
const express = require('express');
const server = express();
var http = require('http').createServer(server);

server.use(express.static('public'));

http.listen(port, function(){
  console.log('listening on *:' + port);
});
