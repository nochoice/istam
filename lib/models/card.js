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
        if(this.symbols.indexOf(s) === -1) {
            this.symbols.push(s);
        }
    }

    console.log(this.symbols);
    return this.symbols;

}

module.exports = Card;