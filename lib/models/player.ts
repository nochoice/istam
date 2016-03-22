import {ICard} from "./card";

export interface IPlayer {
    setCard(card: ICard): void;
}

export class Player implements IPlayer{

    private card: ICard;
    
    constructor(private name: string, private socket: any) {
        console.log("player created");
    }

    public setCard(card: ICard) {
        this.card = card;
    }
}