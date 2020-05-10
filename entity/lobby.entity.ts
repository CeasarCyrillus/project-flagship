import { Player } from "../domain/player";
import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import PlayerEntity from "./player.entity";

@Entity()
class LobbyEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public description: string;

    @OneToOne(type => PlayerEntity, player => player.lobby, {
        cascade: true
    })
    @JoinColumn()
    public owner: PlayerEntity;

}

export default LobbyEntity;