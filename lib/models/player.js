var Player = (function () {
    function Player(name, id, socket) {
        this.name = name;
        this.id = id;
        this.socket = socket;
    }
    Player.prototype.setCard = function (card) {
        this.card = card;
    };
    Player.prototype.getCard = function () {
        return this.card;
    };
    Player.prototype.getSocket = function () {
        return this.socket;
    };
    return Player;
})();
exports.Player = Player;
//# sourceMappingURL=player.js.map