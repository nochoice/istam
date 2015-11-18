var Desk = require('../models/desk.js');
var Player = require('../models/player.js');

var players = {};
var desks = {};
var currentDesk;

function sockets(sockets) {

    sockets.on('connection', function (socket) {

        socket.on('player-data', playerData);
        socket.on('join', join);

        function playerData(data) {
            var player = players[data.userId];

            if(!player) {
                player = new Player(data);
                players[data.userId] = player;
            }

            player.setSocket(socket);
            console.log(players);
        }

        function join(data, cb) {
            console.log(data);

            cb("aaaaaaaaa");
        }


    });
}





module.exports = sockets;