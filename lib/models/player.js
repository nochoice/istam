function Player(player) {

    this.id = player.userId;
    this.name = player.name;
    this.socket;
    this.desk;

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

module.exports = Player;