var app = require('./app');
var http = require('http');
var server = http.createServer(app);
server.listen(3000, function() {
    console.log( 'Express server listening on port 3000');
});