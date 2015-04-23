var express    = require('express'),
    app        = express(),
    http       = require('http').Server(app),
    io         = require('socket.io')(http),
    morgan     = require('morgan'),
    bodyParser = require('body-parser'),
    router     = require('./router')(app);
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));



// Socket IO

// io.on('connection', function(socket) {
//   console.log('a user connected');
//   socket.on('disconnect', function() {
//     console.log('user disconnected');
//   });
//   socket.on('chat message', function(msg) {
// 	  io.emit('chat message', msg);
//   });
// });


app.listen( process.env.PORT || 3000, function () {
    console.log('Running on 3000!');
});
	
module.exports = app;