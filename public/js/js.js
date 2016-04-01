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

        this.players = data;

        html = "<table class='score-table'>";
        for (playerId in this.players) {
            player = this.players[playerId];
            html += "<tr><td>" + player.name + "</td><td class='score'>" + player.score + "</td></tr>"
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

        html += "<div class='no'>&nbsp;</div></div>";

        return html;
    },

    generate: function(where, card) {
        var el = this.holder.find(where);
        var self = this;

        el.html(this.html(card));
        el.find("img").each(function(){
            self.rotateElem($(this));
        });

        this.rotateElem(el);

    },

    setHandlers: function() {
        var self = this;

        this.holder.on("click", ".card-own img", function(e) {
            self.socket.emit("player:card:click", {card: $(this).attr("rel"), uid: localStorage.getItem("uid")}, self.checkValidClick.bind(self));
        });
    },

    rotateElem: function(elem) {
        var a = Math.random() * 100 - 5;

        elem.css({
            "webkitTransform":'rotate(' + a + 'deg)',
            "MozTransform":'rotate(' + a + 'deg)',
            "msTransform":'rotate(' + a + 'deg)',
            "OTransform":'rotate(' + a + 'deg)',
            "transform":'rotate(' + a + 'deg)'
        });
    },

    checkValidClick: function(data) {
        if(!data) {
            this.disable();
        }
    },

    enable: function() {
        this.holder.find(".card-own .no").hide();
    },

    disable: function() {
        this.holder.find(".card-own .no").show();
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

    $(".play-again").click(function(e) {
        setState("join");
    });

    $("#menu .set-name").click(function(e) {
        setState("add-name");
        $("#add-name input").val(localStorage.getItem("playerName"));
    });
}

function setSocketsHandler() {

    socket.on("desk:add-player", function(data) {

    });

    socket.on("desk:start", function(data) {
        setState("play");
        generateDesk(data);
        ScoreBoard.generate(data.players);
    });

    socket.on("desk:refresh-browser", function(data) {
        ScoreBoard.generate(data);
    });

    socket.on("desk:card:current", function(data) {
        Card.generate(".card-current", data.card);
        Card.enable();
    });

    socket.on("desk:card:own", function(data) {
        Card.generate(".card-own", data.card);
    });

    socket.on("desk:score", function(data) {
        ScoreBoard.generate(data);
    });

    socket.on("desk:end", function (data) {
        setState("end-game");
    })

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
