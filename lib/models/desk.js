function Desk(desk) {

    this.id = "";
    this.name = desk.name || "ISTAM game";
    this.players = [];
    this.maxPlayers = desk.maxPlayers || 4;
    this.round = 0;
    this.active = false;
    console.log('desk');

}

Desk.prototype.addPlayer = function(player) {
    if(this.maxPlayers > this.players.length){
        this.players.push(player);
    } else {
        this.start();
    }
}

Desk.prototype.start = function() {
    console.log('start game');
}


module.exports = Desk;