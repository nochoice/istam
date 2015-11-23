var express = require("express");
var app = express();
var io = require('socket.io');
var mainSockets = require('./lib/sockets/sockets.js');

var port = 3700;

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/lib/templates/');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);


app.get("/", function(req, res){
    res.render("index");
});

var sockets = io.listen(app.listen(port));

mainSockets(sockets);


console.log("Listening on port " + port);