var Player = (function () {
    function Player(name, id, socket) {
        this.name = name;
        this.id = id;
        this.socket = socket;
        this.score = 0;
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
    Player.prototype.setSocket = function (socket) {
        this.socket = socket;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.setScore = function (score) {
        this.score = score;
    };
    Player.prototype.incrementScore = function () {
        this.score++;
    };
    return Player;
})();
exports.Player = Player;
//# sourceMappingURL=player.js.map