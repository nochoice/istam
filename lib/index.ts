import io from 'socket.io';
import * as CONST from "./constants";

import {Desk, IDesk} from "./models/desk";
import {Player, IPlayer} from "./models/player";
import {Card, ICard} from "./models/card";

export class Istam {
    private desks: any = {};
    private players: any = {};
    private desk: IDesk;

    constructor(private socket: any) {
        this.desk = this.createDesk();
        this.setSocketConnections();
    }

    public createDesk(): IDesk {
        let d: IDesk = new Desk("Name", 2);
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
            this.players[data.uid] = new Player("Name player", data.uid, socket);
        }

        this.addPlayer2Desk(this.players[data.uid]);

        cb("aadd222aaaa");
    }

    private addPlayer2Desk(player): void {



        if(this.desk.isPrepared()) {
            this.desk.start();
            this.desk = this.createDesk();
        } else {
            this.desk.addPlayer(player);
            
        }

        Object.keys(this.desks).forEach((key: string): void => {
            console.log(key);
        });
    }
}

