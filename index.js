var path=require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({
    defaultLayout: __dirname + '/views/layouts/layout',
    helpers: require('./handlebarHelpers')
});
var qs = require('qs');
require('./socket_config')(server);
var Main = {
    init: function(port) {
        var self = this;
        var port = port || 9090;
        self.reset();
        server.once('error', function(err) {
            console.log("init: An error occured " + err);
        })
        require('./setupTemplateEngine.js').engine(app);
        require('./routes.js').router(app);
        server.listen(port);
        console.log("init: http-monitor-requests express server listening on " + port);
    },
    log: function(req, res, body) {
        var jsonStr ="", req = req || "Request Object Undefined", res = res || "Response Object Undefined", body = body || "Body Empty";
        if(req && req.path) {
            var queryString = req.path.split("?")[1];
            if(queryString)
                req.prettyQueryString = qs.parse(queryString);
        }
        try {
            jsonStr = JSON.stringify({
                req: req,
                res: res,
                body: body
            });
        }
        catch(e) {
            console.log("log: Couldn't stringify json" + e);
        }
        fs.appendFile(__dirname + '/http-requests.log', jsonStr+"," , function(err) {
            if(err) console.log("log: Couldn't log http request: " + err);
        });
    },
    watchLogs: function(socket) {
        var body = {};
        var self = this;
        fs.watchFile(__dirname + '/http-requests.log', function (curr, prev) {
            self.getTemplate().then(function(template) {
                socket.emit('update', {html: template});
            }, function(err) {
                console.log("watchLogs: error while compiling template: " + err);
            })
        });
    },
    getLogs: function() {
        var body = {};
        var logs = fs.readFileSync(__dirname + '/http-requests.log', 'utf8');
        logs = "[" + logs.slice(0, logs.length-1) + "]";
        try {
            body = JSON.parse(logs);
        }
        catch(e) {
            console.log("getLogs: Couldn't JSON parse http-requests.log" + e);
        }
        return body;
    },
    getTemplate: function() {
        var logs = this.getLogs();
        return this.hbs.render(__dirname + '/views/view.handlebars', {
            logs: logs
        });
    },
    reset: function() {
        fs.writeFile(__dirname + '/http-requests.log', "", function(err) {
            if(err) console.log("reset: Couldn't reset http-request file");
        });
    },
    hbs: hbs
}


module.exports = Main;
