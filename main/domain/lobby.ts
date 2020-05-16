import LobbyCode from "./lobbyCode.ts";

class Lobby {
    public code: LobbyCode;
    public description: string;

    constructor(code?: string, description?: string) {
        this.code = new LobbyCode(code);
        this.description = description ? description : `Lobby for game #${this.code}`;
    }
}

export default Lobby;