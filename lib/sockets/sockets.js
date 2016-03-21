var Desk = require('../models/desk.ts');
var Player = require('../models/player.ts');
var Card = require('../models/card.ts');

var players = {};
var playerInDesk = {};
var desks = {};
var currentDesk;



function sockets(sockets) {

    for(var i=0; i<4; i++) {
        var c = new Card({numberOfSymbols: 8});

        c.generate();
        c.getSymbol();
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