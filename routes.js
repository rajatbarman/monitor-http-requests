var indexController = require('./controllers/indexController');

module.exports.router = function(app) {
    app.get('/', function(req, res){
        indexController.init(req, res);
  	});
}