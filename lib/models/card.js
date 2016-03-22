var Card = (function () {
    function Card(card) {
        this.card = card;
    }
    Card.prototype.hasSign = function (sign) {
        return this.card.indexOf(sign) >= 0;
    };
    return Card;
})();
exports.Card = Card;
//# sourceMappingURL=card.js.map