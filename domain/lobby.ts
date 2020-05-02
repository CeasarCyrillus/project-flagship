import { Tweet } from "./tweet";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomId = () => {
    const result = new Array();
    for(let i = 0; i < 6; i++){
        const index = Math.floor(Math.random() * letters.length);
        result.push(letters[index])
    }
    return result.join("");
}


export class Lobby {
    public id: string;
    constructor(tweet?: Tweet) {
        this.id = getRandomId();
    }
}