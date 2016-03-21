import {Player, IPlayer} from "./player";
import * as uid from "uid";
import * as CONST from "../constants";
import {ICard} from "./card";

export interface IDesk {
    addPlayer(player: IPlayer): void;
    start(): void;
    getPlayers(): IPlayer[];
    getDeskId(): string;
    isPrepared(): boolean;
}

export class Desk implements IDesk {

    private players: IPlayer[] = [];
    private deskId: string;
    private currentCard: ICard;

    constructor (private name: string, private maxNumberOfPlayers: number = 5) {
        this.generateDeskId();
    }

    public start(): void {
        console.log("start Game");
    }

    public getPlayers(): IPlayer[] {
        return this.players;
    }

    public addPlayer(player: IPlayer): void {
        if(this.maxNumberOfPlayers > this.players.length) {
            this.players.push(player);
        }
    }

    public isPrepared(): boolean {
        return this.maxNumberOfPlayers === this.players.length;
    }

    public getDeskId(): string {
        return this.deskId;
    }

    private generateDeskId(): void {
        this.deskId = uid(CONST.UID_LENGTH);
    }
}

let d: IDesk = new Desk("name of game", 3);
let p1: IPlayer = new Player("Roman", "aaaa");


d.addPlayer(p1);
console.log(d.getDeskId());
console.log(d.getPlayers());

