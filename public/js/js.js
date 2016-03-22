var socket = io.connect('http://localhost:3700');

if(!localStorage.getItem("uid")) {
    localStorage.setItem("uid", new Date().getTime());
}

socket.emit("player:data", {uid: localStorage.getItem("uid")}, function(data) {console.log(data)});