import io from 'socket.io';
import * as CONST from "./constants";

import {Desk, IDesk} from "./models/desk";
import {Player, IPlayer} from "./models/player";
import {Card, ICard} from "./models/card";

export class Istam {
    private desks: any = {};
    private players: any = {};
    private desk: IDesk;            // open desk, waiting for players
    private playerToDesk: any = {};

    constructor(private socket: any) {
        this.desk = this.createDesk();
        this.setSocketConnections();
    }
    
    public createDesk(): IDesk {
        let d: IDesk = new Desk("Name", CONST.MAX_USERS);
        this.desks[d.getDeskId()] = d;

        return d;
    }


    private setSocketConnections(): void {
        let s: any = this.socket;

        s.on('connection', (socket: any): void => {
            let player: IPlayer;

            socket.on("player:data", (data, cb): void => {
                player = this.playerData(data, cb, socket);

            });
            //socket.on("player:change:name", this.changePlayerName);
            socket.on("player:card:click", (data, cb): void => this.playerCardClick(data,cb));
            socket.on('disconnect', (data: any): void => {
                try {
                    let desk: IDesk = this.playerToDesk[player.getId()];
                    desk.removePlayer(player);
                    this.removePlayerFromDesk(player);
                } catch (e) {
                    console.error("On user disconnect")
                    console.error(e);
                }

            });
        });

    }

    private playerCardClick(data, cb): void {
        if(this.playerToDesk[data.uid]) {
            let desk: IDesk = this.playerToDesk[data.uid];
            let player: IPlayer = this.players[data.uid];

            let hasSign = desk.getCurrentCard().hasSign(data.card);

            if(hasSign) {
                player.setCard(desk.getCurrentCard());
                player.getSocket().emit("desk:card:own", {card: player.getCard().getCard()});
                player.incrementScore();

                if (desk.isCardInStack()) {
                    let currentCard: any = desk.setCurrentCard().getCard();
                    let currentScore: any = desk.getPlayersScore();

                    desk.getPlayers().forEach((player: IPlayer): void => {
                        let ps: any = player.getSocket();

                        ps.emit("desk:card:current", {card: currentCard});
                        // ps.emit("desk:score", currentScore);

                    });
                } else {
                    desk.getPlayers()
                        .forEach((p: IPlayer): void => {
                            let ps: any = p.getSocket();

                            ps.emit("desk:score", desk.getPlayersScore());
                            ps.emit("desk:end", {data: "game end"});

                            this.removePlayerFromDesk(p);
                        });

                    delete this.desks[desk.getDeskId()];

                    console.log(Object.keys(this.desks).length);
                    console.log(Object.keys(this.playerToDesk).length);
                }
            }

            cb(hasSign);
        }
    }

    private playerData(data: any, cb: any, socket: any): IPlayer {

        let player: IPlayer = this.players[data.uid];

        if(!player) {
            player = this.players[data.uid] = new Player(data.name, data.uid);
        }

        player.setSocket(socket);
        player.setName(data.name);

        if(!this.isPlayerIsInDesk(player)) {
            this.addPlayerToDesk(player);
        } else {
            this.deskFullData(player);
        }

        this.deskStart();
        //cb();

        return player;
    }

    private deskFullData(player: IPlayer): void {
        let desk: IDesk = this.playerToDesk[player.getId()];

        player.getSocket().emit("desk:refresh-browser", desk.generateState());
        console.log(desk.generateState());
    }


    private deskStart(): void {
        if(this.desk.isPrepared()) {
            this.desk.start();
            this.desk = this.createDesk();
        }
    }

    private isPlayerIsInDesk(player: IPlayer): boolean {
        return !!this.playerToDesk[player.getId()];
    }

    private addPlayerToDesk(player: IPlayer): void {
        this.playerToDesk[player.getId()] = this.desk;
        this.desk.addPlayer(player);

        let playersNum: number = this.desk.getPlayers().length;
        this.desk.getPlayers().forEach((p: IPlayer): void => {
            p.getSocket().emit("desk:players-in-desk", {actual: playersNum, max: CONST.MAX_USERS});
        });
    }

    private removePlayerFromDesk(player: IPlayer): void {
        if(player) {
            delete this.playerToDesk[player.getId()];
        }
    }

    private removePlayer(player: IPlayer): void {
        if(player) {
            delete this.players[player.getId()];
        }

    }
}



