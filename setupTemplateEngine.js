var Main = require('./index');

module.exports.engine = function(app) {

    app.set('views', __dirname + '/views');

    app.engine('handlebars', Main.hbs.engine);

    app.set('view engine', 'handlebars');   

}