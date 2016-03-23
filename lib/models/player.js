var Player = (function () {
    function Player(name, id, socket) {
        this.name = name;
        this.id = id;
        this.socket = socket;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.setCard = function (card) {
        this.card = card;
    };
    Player.prototype.getCard = function () {
        return this.card;
    };
    Player.prototype.getId = function () {
        return this.id;
    };
    Player.prototype.getSocket = function () {
        return this.socket;
    };
    return Player;
})();
exports.Player = Player;
//# sourceMappingURL=player.js.map