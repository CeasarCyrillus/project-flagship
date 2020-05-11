import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import PlayerEntity from "./player.entity";

@Entity()
class LobbyEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public code: string;

    @Column()
    public description: string;

    @OneToMany(type => PlayerEntity, player => player.lobby, {cascade: true})
    public players: PlayerEntity[]
}

export default LobbyEntity;