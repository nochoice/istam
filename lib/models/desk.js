var uid = require("uid");

function Desk(desk) {

    this.id = uid(20);
    this.name = desk.name || "ISTAM game";
    this.players = [];
    this.maxPlayers = desk.maxPlayers || 2;
    this.round = 0;
    this.active = false;
    console.log('desk :: create');

}

Desk.prototype.addPlayerIfNotIn = function(player) {

    if(!this.isPlayerInDesk(player) && !player.getDesk()) {

        console.log("---");
        console.log(player.getDesk());
        console.log("---");
        this.players.push(player);
        player.setDesk(this);
    }

    if(this.isFull()) {
        this.start();
    }
}

Desk.prototype.isPlayerInDesk = function(player) {
    var i,
        p;

    for (i=0; i<this.players.length; i++) {
        p = this.players[i];

        console.log(p.id);

        if(p.id === player.id) {
            return true;
        }
    }

    return false;
}

Desk.prototype.getId = function() {
    return this.id;
}

Desk.prototype.start = function() {
    console.log('start game');
}

Desk.prototype.isFull = function() {

    console.log(this.maxPlayers, this.players.length);

    if (this.maxPlayers > this.players.length) {
        return false;
    } else {
        return true;
    }
}

module.exports = Desk;