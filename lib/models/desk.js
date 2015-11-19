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

Desk.prototype.addPlayer = function(player) {
    if(!this.isFull()){
        this.players.push(player);
    } else {
        this.start();
    }
}

Desk.prototype.getId = function() {
    return this.id;
}

Desk.prototype.start = function() {
    console.log('start game');
}

Desk.prototype.isFull = function() {
    if (this.maxPlayers > this.players.length) {
        return true;
    } else {
        return false;
    }
}

module.exports = Desk;