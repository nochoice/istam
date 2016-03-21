"use strict";
var player_1 = require("./player");
var uid = require("uid");
var CONST = require("../constants");
var Desk = (function () {
    function Desk(name, maxNumberOfPlayers) {
        if (maxNumberOfPlayers === void 0) { maxNumberOfPlayers = 5; }
        this.name = name;
        this.maxNumberOfPlayers = maxNumberOfPlayers;
        this.players = [];
        this.generateDeskId();
    }
    Desk.prototype.start = function () {
        console.log("start Game");
    };
    Desk.prototype.getPlayers = function () {
        return this.players;
    };
    Desk.prototype.addPlayer = function (player) {
        if (this.maxNumberOfPlayers > this.players.length) {
            this.players.push(player);
        }
    };
    Desk.prototype.isPrepared = function () {
        return this.maxNumberOfPlayers === this.players.length;
    };
    Desk.prototype.getDeskId = function () {
        return this.deskId;
    };
    Desk.prototype.generateDeskId = function () {
        this.deskId = uid(CONST.UID_LENGTH);
    };
    return Desk;
}());
exports.Desk = Desk;
var d = new Desk("name of game", 3);
var p1 = new player_1.Player("Roman", "aaaa");
d.addPlayer(p1);
console.log(d.getDeskId());
console.log(d.getPlayers());
