"use strict";
var Player = (function () {
    function Player(name, socket) {
        this.name = name;
        this.socket = socket;
        console.log("player created");
    }
    Player.prototype.setCard = function (card) {
        this.card = card;
    };
    return Player;
}());
exports.Player = Player;
