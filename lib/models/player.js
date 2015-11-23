function Player(player) {

    this.id = player.userId;
    this.name = player.name;
    this.socket;
    this.desk;
    this.card;

}

Player.prototype.setSocket = function(socket) {
    this.socket = socket;
}

Player.prototype.setDesk = function(desk) {
    this.desk = desk;
}

Player.prototype.getDesk = function() {
    return this.desk;
}
Player.prototype.setCard = function(card) {
    this.card = card;
}

module.exports = Player;