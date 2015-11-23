var uid = require("uid");
var Card = require("./card.js");

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

    new Card().generate();

    if(!this.isPlayerInDesk(player) && !player.getDesk()) {

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

    this.generatePlayersCard();
}

Desk.prototype.generatePlayersCard = function() {
    var i,
        p;

    for (i=0; i<this.players.length; i++) {
        p = this.players[i];

    }
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