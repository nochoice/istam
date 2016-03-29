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
    players: {},
    generate: function(data) {
        var playerId,
            player,
            html;

        this.players = data.players;

        html = "<table class='score-table'>";
        for (playerId in this.players) {
            player = this.players[playerId];
            html += "<tr><td>" + player.name + "</td><td>" + player.score + "</td></tr>"
        }

        html += "</table>";
        this.holder.html(html);
    }
};

var Card = {
    holder: $("#play"),
    socket: {},
    html: function(card) {
        var html =  "<div class='card'>";

        card.forEach(function(sign, i) {
            var path = "/images/" + sign + ".png";
            html += "<img src='" + path + "' class='sign sign" + i + "' rel='" + sign + "'/>"
        });

        html += "</div>";

        $(html).find("img").each(function(){
            var a = Math.random() * 100 - 5;
            $(this).css('transform', 'rotate(' + a + 'deg)');
        });

        return html;
    },

    generate: function(where, card) {
        this.holder.find(where).html(this.html(card));
    },

    setHandlers: function() {
        var self = this;
        this.holder.on("click", "img", function(e) {
            self.socket.emit("player:card:click", {card: $(this).attr("rel"), uid: localStorage.getItem("uid")});
        });
    }
};

function init() {

    setHandlers();
    setSocketsHandler();

    Card.setHandlers();
    Card.socket = socket;

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

    socket.on("desk:add-player", function(data) {
        console.log(data);
    });

    socket.on("desk:start", function(data) {
        setState("play");
        generateDesk(data);
        ScoreBoard.generate(data);
    });

    socket.on("desk:refresh-browser", function(data) {
        setState("play");
        ScoreBoard.generate(data);
    });
}

function generateDesk(data) {
    Card.generate(".card-current", data.currentCard);
    Card.generate(".card-own", data.players[uid].card);
}


function userDataEmit() {
    socket.emit("player:data", {
        uid: localStorage.getItem("uid"),
        name: localStorage.getItem("playerName")

    }, function(data) {});

    setState("wait");
}

init();
