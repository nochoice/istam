function Player(player) {

    this.id = player.userId;
    this.name = player.name;
    this.socket;

    console.log("Player");
}

Player.prototype.setSocket = function(socket) {
    this.socket = socket;
}

module.exports = Player;