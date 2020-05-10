import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";
import LobbyEntity from "./lobby.entity";
import { Player } from "../../domain/player";

@Entity()
class PlayerEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @OneToOne(type => LobbyEntity, lobby => lobby.owner)
    public lobby: LobbyEntity;
}

export default PlayerEntity;