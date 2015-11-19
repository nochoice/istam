var Desk = require('../models/desk.js');
var Player = require('../models/player.js');

var players = {};
var playerInDesk = {};
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

        }

        function join(data, cb) {

            var userId = data.userId,
                player = players[userId];

            if(!currentDesk || currentDesk.isFull()) {
                currentDesk = new Desk({});

                desks[currentDesk.getId()] = currentDesk;
            }

            if(!player.getDesk()) {
                currentDesk.addPlayer(player);
                player.setDesk(currentDesk);

                cb({deskId: currentDesk.getId()});
            }


        }
    });
}





module.exports = sockets;