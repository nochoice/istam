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
    isStarted(): boolean;
    generateState(): any;
    getCurrentCard(): ICard;
    setCurrentCard(): ICard;
    getPlayersScore(): any;
    isCardInStack(): boolean;
}

export class Desk implements IDesk {

    private players: IPlayer[] = [];
    private deskId: string;
    private cards: any;
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
        this.setPlayersScore(0);

        this.players
            .forEach((player: IPlayer): void => {
                player.getSocket().emit("desk:start", this.generateState());
            });
    }

    public getPlayers(): IPlayer[] {
        return this.players;
    }

    public addPlayer(player: IPlayer): void {

        if(this.maxNumberOfPlayers > this.players.length
            && !this.started
            && !this.playerIsInDesk(player)) {

            this.players.push(player);

            this.players
                .forEach((p: IPlayer): void => {
                    p.getSocket().emit("desk:add-player", {data: "player added " + player.getName()});
                });

        }
    }

    public isPrepared(): boolean {
        return this.maxNumberOfPlayers === this.players.length;
    }

    public isStarted(): boolean {
        return this.started;
    }

    public getDeskId(): string {
        return this.deskId;
    }

    public generateState(): any {
        let state = {
            players: {},
            currentCard: this.currentCard.getCard()
        };

        this.players
            .forEach((p: IPlayer): void => {
                let id: string = p.getId();
                let card:ICard = p.getCard();

                state.players[id] = {
                    name: p.getName(),
                    card: p.getCard().getCard(),
                    score: p.getScore()
                };
            });

        return state;
    }

    private playerIsInDesk(player: IPlayer): boolean {
        let isIn: boolean = false;
        this.players.forEach((p: IPlayer): void => {

            if(player.getId() === p.getId()) {
                isIn= true;
            }
        });

        return isIn;
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


    private setPlayersScore(score: number): void {
        this.players.forEach((player): void => {
            player.setScore(0);
        });
    }

    public setCurrentCard(): ICard {
        if(this.cards.length > 0) {
            this.currentCard = new Card(this.cards.pop());
            return this.currentCard;
        }
    }

    public isCardInStack(): boolean {
        return !!this.cards.length;
    }

    public getCurrentCard(): ICard {
        return this.currentCard;
    }

    public getPlayersScore(): any {
        let data: any = {};

        this.players.forEach((p: IPlayer): void => {
            data[p.getId()] = {
                name: p.getName(),
                score: p.getScore()
            }
        });

        return data;
    }
}

