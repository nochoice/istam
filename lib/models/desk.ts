import * as _ from "lodash";
import * as uid from "uid";
import * as CONST from "../constants";

import {Player, IPlayer} from "./player";
import {ICard, Card} from "./card";

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
    private cards: number[];
    private currentCard: ICard;
    private started: boolean = false;

    constructor (private name: string, private maxNumberOfPlayers: number = 5) {
        this.generateDeskId();
        this.copyCardSet();
    }

    public start(): void {
        console.log("start Game");
        this.started = true;

        this.setPlayersCard();
        this.setCurrentCard();
    }

    public getPlayers(): IPlayer[] {
        return this.players;
    }

    public addPlayer(player: IPlayer): void {
        if(this.maxNumberOfPlayers > this.players.length && !this.started) {
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

    private copyCardSet(): void {
        this.cards = _.shuffle(CONST.CARDS);
    }

    private setPlayersCard(): void {
        this.players.forEach((player): void => {
            let card: ICard = new Card(this.cards.pop());
            player.setCard(card);
        });
    }

    private setCurrentCard(): void {
        this.currentCard = this.cards.pop();
    }
}

