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

class LobbyCode {
    private _code: string;
    constructor(code?: string) {
        if(!code) code = getRandomCode();
        if(code.length < 6) throw new InvalidLobbyCodeError("Lobby code have to be 6 letters or more");
        if(code.toUpperCase() !== code) throw new InvalidLobbyCodeError("Lobby code have to be uppercase");
        
        this._code = code;
    }

    public toString(): string {
        return this._code;
    }
}

export default LobbyCode;