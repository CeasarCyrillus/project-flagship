import LobbyCode from "./lobbyCode.ts";
import InvalidLobbyOwnerError from "./error/invalidLobbyOwnerError.ts";
import { IEntity } from "../storage/sSOrm.ts";

class Lobby implements IEntity{
    id!: string | null;
    public owner: string;
    public readonly code: LobbyCode;
    public readonly description: string;

    constructor(owner: string, code?: string, description?: string) {
        if(owner === undefined) throw new InvalidLobbyOwnerError("Lobby must have owner");
        this.owner = owner;
        this.code = new LobbyCode(code);
        this.description = description ? description : `Lobby for game #${this.code}`;
    }
}

export default Lobby;