import { Fixture } from "../test/fixture";

export class Lobby {
    public id: string;
    public description: string;
    constructor(id: string, description?: string) {
        if(id === undefined) id = Fixture.lobbyId;
        if(id.length < 6) throw Error("Lobby id have to be 6 letters or more");
        if(id.toUpperCase() !== id) throw Error("Lobby id have to be uppercase");
        this.description = description ? description : `Lobby for game #${id}`;
        this.id = id;
    }
}