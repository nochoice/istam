var _ = require("lodash");
var uid = require("uid");
var CONST = require("../constants");
var card_1 = require("./card");
var Desk = (function () {
    function Desk(name, maxNumberOfPlayers) {
        if (maxNumberOfPlayers === void 0) { maxNumberOfPlayers = 5; }
        this.name = name;
        this.maxNumberOfPlayers = maxNumberOfPlayers;
        this.players = [];
        this.started = false;
        this.generateDeskId();
        this.copyCardSet();
    }
    Desk.prototype.start = function () {
        console.log("start Game");
        this.started = true;
        this.setPlayersCard();
        this.setCurrentCard();
    };
    Desk.prototype.getPlayers = function () {
        return this.players;
    };
    Desk.prototype.addPlayer = function (player) {
        if (this.maxNumberOfPlayers > this.players.length && !this.started) {
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
    Desk.prototype.copyCardSet = function () {
        this.cards = _.shuffle(CONST.CARDS);
    };
    Desk.prototype.setPlayersCard = function () {
        var _this = this;
        this.players.forEach(function (player) {
            var card = new card_1.Card(_this.cards.pop());
            player.setCard(card);
        });
    };
    Desk.prototype.setCurrentCard = function () {
        this.currentCard = this.cards.pop();
    };
    return Desk;
})();
exports.Desk = Desk;
//# sourceMappingURL=desk.js.map