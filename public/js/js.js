var socket = io.connect('http://localhost:3700');
var gameStates = ["add-name", "join", "wait", "play", "end-game"];

function setState(state) {
    gameStates.forEach(function(state) {
        $("#" + state).css("display", "none");
    });

    $("#" + state).css("display", "block");
}

function init() {

    setHandlers();
    setSocketsHandler();

    if(!localStorage.getItem("uid")) {
        localStorage.setItem("uid", new Date().getTime());
    }

    if(!localStorage.getItem("playerName")) {
        setState("add-name");
    } else {
        setState("join");
    }
}

function setHandlers() {
    $("#add-name button").click(function(e) {
        var name = $("#add-name input").val();

        if(name) {
            localStorage.setItem("playerName", name);
            setState("join");
        }
    });

    $("#join button").click(function(e) {
        userDataEmit();
    });
}

function setSocketsHandler() {
    console.log("sockets");
    socket.on("desk:add-player", function(data) {
        console.log(data);
    });

    socket.on("desk:start", function(data) {
        console.log("game start");
        console.log(data);

        setState("play");
        generateDesk(data);
    });

    socket.on("desk:refresh-browser", function(data) {
        setState("play");
        generateDesk(data);
    });
}

function generateDesk(data) {
    var playBlock = $("#play");

    playBlock.find(".card-current").html(generateCard(data.currentCard));
}

function generateCard(card) {
    return JSON.stringify(card);
}

function userDataEmit() {
    socket.emit("player:data", {
        uid: localStorage.getItem("uid"),
        name: localStorage.getItem("playerName")

    }, function(data) {});

    setState("wait");
}

init();






//socket.emit("player:data", {
//    uid: localStorage.getItem("uid"),
//    name: localStorage.getItem("playerName")
//
//}, function(data) {
//    //console.log(data)
//});
//
//socket.on("desk:add-player", function(data) {
//    console.log(data);
//})