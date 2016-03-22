import * as CONST from "../constants";
import {ICard} from "./card";

export interface IPlayer {
    setCard(card: ICard): void;
    getCard(): ICard;
    getSocket(): any;
}

export class Player implements IPlayer{

    private card: ICard;
    private winCards: ICard[];
    
    constructor(private name: string, private id: string, private socket?: any) {

    }

    public setCard(card: ICard) {
        this.card = card;
    }

    public getCard(): ICard {
        return this.card;
    }

    public getSocket(): any {
        return this.socket;
    }
}