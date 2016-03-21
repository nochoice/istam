import {Player, IPlayer} from "./player";

const maxPlayers:number = 5;

export class Desk {
    private players: IPlayer[];

    constructor (private name: string, private maxNumberOfPlayers: number) {}

    public start(): void {
        console.log("start Game")
    }

    public getPlayers(): IPlayer[] {
        return this.players;
    }

    public addPlayer(player: IPlayer): void {
        if(this.maxNumberOfPlayers < this.players.length) {
            this.players.push(player);
        }
    }
}


let d: Desk = new Desk("name of game", 5);
d.start();