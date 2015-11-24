var mainSymbols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function Card(opt) {
    opt = opt || {};

    this.numberOfSymbols = opt.numberOfSymbols || 7;
    this.symbols = [];
}

Card.prototype.generate = function() {
    var s,
        len = mainSymbols.length - 1;


    while (this.symbols.length < this.numberOfSymbols) {

        s = mainSymbols[Math.round(Math.random() * len)];
        if(!this.exists(s)) {
            this.symbols.push(s);
        }
    }

    console.log(this.symbols);
    return this.symbols;
};

Card.prototype.exists = function(symbol) {
    if(this.symbols.indexOf(symbol) === -1) {
        return false;
    } else {
        return true;
    }
};




module.exports = Card;