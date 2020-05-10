import { Player } from "../domain/player";
import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class LobbyEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;
    
    @Column()
    public owner: string;

}

export default LobbyEntity;