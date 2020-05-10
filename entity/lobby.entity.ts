import { Player } from "../domain/player";
import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
class LobbyEntity {
    @PrimaryColumn()
    public id: string;

    @Column()
    public description: string;
    

    public owner: Player;

    constructor(id: string, owner: Player, description?: string) {
        this.id = id;
        this.description = description ? description : `Lobby for game #${id}`;
        this.owner = owner;
    }
}

export default LobbyEntity;