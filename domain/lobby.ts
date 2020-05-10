import { Player } from "./player";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomCode = () => {
    const result = new Array();
    for(let i = 0; i < 6; i++){
        const index = Math.floor(Math.random() * letters.length);
        result.push(letters[index])
    }
    return result.join("");
}

export class Lobby {
    public id: number;
    public code: string;
    public description: string;
    public owner: Player;
    public players: Player[];

    constructor(code: string, owner: Player, description?: string) {
        if(!code) code = getRandomCode();
        if(code.length < 6) throw Error("Lobby id have to be 6 letters or more");
        if(code.toUpperCase() !== code) throw Error("Lobby id have to be uppercase");
        if(owner === undefined) throw Error("Lobby must have owner");
        
        this.code = code;
        this.description = description ? description : `Lobby for game #${code}`;
        this.owner = owner;
        this.players = new Array<Player>();
        this.players.push(owner);
    }
}
