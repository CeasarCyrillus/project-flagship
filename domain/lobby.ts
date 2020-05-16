import Player from "./player.ts";
import InvalidLobbyCodeError from "./exceptions/invalidLobbyCode.ts";
import LobbyCode from "./lobbyCode.ts";

class Lobby {
    public code: LobbyCode;
    public description: string;
    private players: Player[] = new Array<Player>();

    constructor(code?: string, description?: string) {
        this.code = new LobbyCode(code);
        this.description = description ? description : `Lobby for game #${this.code}`;
    }

    public addPlayer(player: Player): void {
        const playerUsernameExists = this.getPlayers().findIndex(p => player.username === p.username) !== -1;
        if(playerUsernameExists) throw new Error("Username isn't unique");
        this.players.push(player);
    }

    public getPlayers = () => [...this.players];
}

export default Lobby;