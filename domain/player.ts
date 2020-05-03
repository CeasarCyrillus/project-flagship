export class Player {
    public username: string;
    constructor(username: string) {
        if(!username || username.length < 6) throw new Error("Username must be 6 character or more");
        this.username = username;
    }
}