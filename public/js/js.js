var socket = io.connect('http://localhost:3700');
var gameStates = ["add-name", "join", "wait", "play", "end-game"];
var uid;

function setState(state) {
    gameStates.forEach(function(state) {
        $("#" + state).css("display", "none");
    });

    $("#" + state).css("display", "block");
}

var ScoreBoard = {
    holder: $(".score-board"),
    generate: function(data) {
        this.holder.html("aaaa");
    }
};

ScoreBoard.generate();


function init() {

    setHandlers();
    setSocketsHandler();

    if(!localStorage.getItem("uid")) {
        localStorage.setItem("uid", new Date().getTime());
    }

    uid = localStorage.getItem("uid");

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
    generateCard(".card-current", data.currentCard);
    generateCard(".card-own", data.players[uid].card);
}

function generateCard(where, card) {
    var playBlock = $("#play");
    playBlock.find(where).html(generateHtmlCard(card));
}

function generateHtmlCard(card) {
    var html =  "<div class='card'>";

    card.forEach(function(sign, i) {
        var path = "/images/" + sign + ".png";
        html += "<img src='" + path + "' class='sign sign" + i + "'/>"
    });

    html += "</div>";

    console.log($(html).find("img"));

    $(html).find("img").each(function(){
        var a = Math.random() * 100 - 5;
        $(this).css('transform', 'rotate(' + a + 'deg)');
    });

    return html;
}

function generateScoreBoard() {

}

function userDataEmit() {
    socket.emit("player:data", {
        uid: localStorage.getItem("uid"),
        name: localStorage.getItem("playerName")

    }, function(data) {});

    setState("wait");
}

init();
