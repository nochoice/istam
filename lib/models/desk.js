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
        var _this = this;
        console.log("start Game");
        this.started = true;
        this.setPlayersCard();
        this.setCurrentCard();
        this.players
            .forEach(function (player) {
            player.getSocket().emit("desk:start", _this.generateState());
        });
    };
    Desk.prototype.getPlayers = function () {
        return this.players;
    };
    Desk.prototype.addPlayer = function (player) {
        if (this.maxNumberOfPlayers > this.players.length
            && !this.started
            && !this.playerIsInDesk(player)) {
            this.players.push(player);
            this.players
                .forEach(function (p) {
                p.getSocket().emit("desk:add-player", { data: "player added " + player.getName() });
            });
        }
    };
    Desk.prototype.isPrepared = function () {
        return this.maxNumberOfPlayers === this.players.length;
    };
    Desk.prototype.isStarted = function () {
        return this.started;
    };
    Desk.prototype.getDeskId = function () {
        return this.deskId;
    };
    Desk.prototype.generateState = function () {
        var state = {
            players: {},
            currentCard: this.currentCard
        };
        this.players
            .forEach(function (p) {
            var id = p.getId();
            var card = p.getCard();
            state.players[id] = {
                name: p.getName(),
                card: p.getCard().getCard(),
                score: p.getScore()
            };
        });
        return state;
    };
    Desk.prototype.playerIsInDesk = function (player) {
        var isIn = false;
        this.players.forEach(function (p) {
            if (player.getId() === p.getId()) {
                isIn = true;
            }
        });
        console.log("Is in " + isIn);
        return isIn;
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