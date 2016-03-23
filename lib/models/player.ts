import * as CONST from "../constants";
import {ICard} from "./card";
import {IDesk} from "./desk";

export interface IPlayer {
    disconected: boolean;
    setCard(card: ICard): void;
    getCard(): ICard;
    getId(): string;
    getSocket(): any;
    getName(): string;
    //getDesk(): IDesk;
    //setDesk(desk: IDesk): void;
    //resetDesk(): void;
}

export class Player implements IPlayer{

    public disconected: boolean;
    private card: ICard;
    private winCards: ICard[];
    private desk: IDesk;
    
    constructor(private name: string, private id: string, private socket?: any) {

    }

    public getName(): string {
        return this.name;
    }

    public setCard(card: ICard) {
        this.card = card;
    }

    public getCard(): ICard {
        return this.card;
    }

    public getId(): string {
        return this.id;
    }

    public getSocket(): any {
        return this.socket;
    }

    //public setDesk(desk: IDesk) {
    //    this.desk = desk;
    //}
    //
    //public getDesk(): IDesk {
    //    return this.desk;
    //}
    //
    //public resetDesk(): void {
    //    this.desk = null;
    //}
}