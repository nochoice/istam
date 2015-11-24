var Desk = require('../models/desk.js');
var Player = require('../models/player.js');
var Card = require('../models/card.js');

var players = {};
var playerInDesk = {};
var desks = {};
var currentDesk;



function sockets(sockets) {

    for(var i=0; i<5; i++) {
        new Card({numberOfSymbols: 7}).generate();
    }

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

            currentDesk.addPlayerIfNotIn(player);

            cb({deskId: player.getDesk().getId()});



        }
    });
}





module.exports = sockets;