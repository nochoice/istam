export interface ICard {
    hasSign(sign: number): boolean;
    getCard(): number[];
}

export class Card implements ICard {
    constructor(private card: number[]) {}

    public hasSign(sign: number): boolean {
        return this.card.indexOf(sign) >= 0;
    }

    public getCard(): number[] {
        return this.card;
    }
}