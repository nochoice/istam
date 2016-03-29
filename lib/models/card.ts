export interface ICard {
    hasSign(sign: number): boolean;
    getCard(): number[];
}

export class Card implements ICard {
    constructor(private card: number[]) {}

    public hasSign(sign: string): boolean {
        return this.card.indexOf(parseInt(sign, 10)) >= 0;
    }

    public getCard(): number[] {
        return this.card;
    }
}