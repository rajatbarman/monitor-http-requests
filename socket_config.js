module.exports = function(server) {

	var io = require('socket.io')(server);

	io.on('connection', function(socket) {
		var Main = require('./index');
		Main.watchLogs(socket);
		socket.on('reset', function() {
			Main.reset();
		})
	})

}