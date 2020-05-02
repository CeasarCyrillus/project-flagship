export class Lobby {
    public id: string;
    constructor(id: string) {
        if(id.length < 6) throw Error("Lobby id have to be 6 letters or more");
        if(id.toUpperCase() !== id) throw Error("Lobby id have to be uppercase");
        this.id = id;
    }
}