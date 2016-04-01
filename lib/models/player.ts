import * as CONST from "../constants";
import {ICard} from "./card";
import {IDesk} from "./desk";

export interface IPlayer {
    disconected: boolean;
    setCard(card: ICard): void;
    getCard(): ICard;
    getId(): string;
    getSocket(): any;
    setSocket(socket: any): void
    getName(): string;
    setName(name: string): void;
    getScore(): number;
    setScore(score: number): void;
    incrementScore(): void;
    //getDesk(): IDesk;
    //setDesk(desk: IDesk): void;
    //resetDesk(): void;
}

export class Player implements IPlayer{

    public disconected: boolean;
    private card: ICard;
    private winCards: ICard[];
    private desk: IDesk;
    private score: number = 0;
    
    constructor(private name: string, private id: string, private socket?: any) {
        this.setName(name);
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name.substring(0,CONST.MAX_USER_NAME_LENGTH);
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

    public setSocket(socket: any): void {
        this.socket = socket;
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public incrementScore(): void {
        this.score++;
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