import { Player } from "./player";
import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomId = () => {
    const result = new Array();
    for(let i = 0; i < 6; i++){
        const index = Math.floor(Math.random() * letters.length);
        result.push(letters[index])
    }
    return result.join("");
}

@Entity()
export class Lobby {
    @PrimaryColumn()
    public id: string;

    @Column()
    public description: string;
    

    public owner: Player;

    constructor(id: string, owner: Player, description?: string) {
        if(!id) id = getRandomId();
        if(id.length < 6) throw Error("Lobby id have to be 6 letters or more");
        if(id.toUpperCase() !== id) throw Error("Lobby id have to be uppercase");
        if(owner === undefined) throw Error("Lobby must have owner");
        
        this.id = id;
        this.description = description ? description : `Lobby for game #${id}`;
        this.owner = owner;
    }
}