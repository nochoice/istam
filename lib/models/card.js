var mainSymbols = ["AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ",
                   "KK", "LL", "MM", "NN", "OO", "PP", "RR", "SS", "TT", "UU",
                   "VV", "XX", "YY", "ZZ", "AB", "AC", "AD", "AE", "AF", "AG"];

function Card(opt) {
    opt = opt || {};

    this.numberOfSymbols = opt.numberOfSymbols || 8;
    
}

Card.prototype.generate = function() {
    var s,
        len = mainSymbols.length;
    this.symbols = [];

    while (this.symbols.length < this.numberOfSymbols) {
        s = mainSymbols[Math.floor(Math.random() * len)];
        // console.log(s);
        if(!this.existsIn(s) && s) {
            // console.log("--- ",s);
            this.symbols.push(s);
        }
    }

    console.log(this.symbols);

    return this.symbols;
};

Card.prototype.existsIn = function(symbol) {
    if(this.symbols.indexOf(symbol) === -1) {
        return false;
    } else {
        return true;
    }
};

Card.prototype.getSymbol = function() {
    
    var rand = Math.floor(Math.random() * (this.numberOfSymbols));
    // console.log(this.symbols);
    console.log(rand, this.symbols[rand]);
    
    return this.symbols[rand];
}

module.exports = Card;