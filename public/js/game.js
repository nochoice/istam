var enviroment = require("./environment.js").get();
var socket = io.connect('http://localhost:3700');

var joinBtn = document.querySelector('.js-btn-join');
joinBtn.addEventListener('click', join);

function join(e) {
    socket.emit('join', enviroment);
}


console.log(enviroment);