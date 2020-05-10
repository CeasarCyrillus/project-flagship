import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import PlayerEntity from "./player.entity";
import { Lobby } from "../../domain/lobby";

@Entity()
class LobbyEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public code: string;

    @Column()
    public description: string;

    @OneToOne(type => PlayerEntity, player => player.lobby, {cascade: true})
    @JoinColumn()
    public owner: PlayerEntity;
}

export default LobbyEntity;