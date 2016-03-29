var Card = (function () {
    function Card(card) {
        this.card = card;
    }
    Card.prototype.hasSign = function (sign) {
        return this.card.indexOf(parseInt(sign, 10)) >= 0;
    };
    Card.prototype.getCard = function () {
        return this.card;
    };
    return Card;
})();
exports.Card = Card;
//# sourceMappingURL=card.js.map