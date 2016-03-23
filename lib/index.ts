import io from 'socket.io';
import * as CONST from "./constants";

import {Desk, IDesk} from "./models/desk";
import {Player, IPlayer} from "./models/player";
import {Card, ICard} from "./models/card";
import {IPlayer} from "./models/player";

export class Istam {
    private desks: any = {};
    private players: any = {};
    private desk: IDesk;
    private playerToDesk: any = {};

    constructor(private socket: any) {
        this.desk = this.createDesk();
        this.setSocketConnections();
    }

    public createDesk(): IDesk {
        let d: IDesk = new Desk("Name", 1);
        this.desks[d.getDeskId()] = d;

        return d;
    }

    private setSocketConnections(): void {
        let s: any = this.socket;

        s.on('connection', (socket: any): void => {
            socket.on("player:data", (data, cb): void => this.playerData(data, cb, socket));

            socket.on('disconnect', (data: any): void => console.log("disconnect"));
        });

    }

    private playerData(data: any, cb: any, socket: any) {
        let player: IPlayer = this.players[data.uid];

        if(!player) {
            player = this.players[data.uid] = new Player(data.name, data.uid, socket);
        }

        console.log("1");

        if(!this.isPlayerIsInDesk(player)) {
            this.addPlayerToDesk(player);
        } else {
            console.log("asaasas");
            this.deskFullData(player);
        }

        this.deskStart();
        cb();
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
    }
}



