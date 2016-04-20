var Main  =  require('../index');

module.exports = {
	init: function(req, res) {
		var logs = Main.getLogs();
      	res.render('view', {
        	logs: logs
    	});
	}
}