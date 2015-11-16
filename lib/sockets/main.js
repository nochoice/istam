var Desk = require('../models/desk.js');

function sockets(sockets) {

    sockets.on('connection', function (socket) {

        socket.on('join', join);

        //socket.emit('message', { message: 'welcome to the chat' });
        //socket.on('send', function (data) {
        //    io.sockets.emit('message', data);
        //});
    });
}


function join(data) {
    console.log(data);
}








module.exports = sockets;