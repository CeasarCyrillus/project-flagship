import Player from "./player.ts";
import InvalidLobbyCodeError from "./exceptions/invalidLobbyCode.ts";


const getRandomCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const result = new Array();
    for(let i = 0; i < 6; i++){
        const index = Math.floor(Math.random() * letters.length);
        result.push(letters[index])
    }
    return result.join("");
}

class Lobby {
    public code: string;
    public description: string;
    private players: Player[] = new Array<Player>();

    constructor(code?: string, description?: string) {
        if(!code) code = getRandomCode();
        if(code.length < 6) throw new InvalidLobbyCodeError("Lobby code have to be 6 letters or more");
        if(code.toUpperCase() !== code) throw new InvalidLobbyCodeError("Lobby code have to be uppercase");
        
        this.code = code;
        this.description = description ? description : `Lobby for game #${code}`;
    }

    public addPlayer(player: Player): void {
        const playerUsernameExists = this.getPlayers().findIndex(p => player.username === p.username) !== -1;
        if(playerUsernameExists) throw new Error("Username isn't unique");
        this.players.push(player);
    }

    public getPlayers = () => [...this.players];
}

export default Lobby;