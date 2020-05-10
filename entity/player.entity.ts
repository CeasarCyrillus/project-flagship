import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity } from "typeorm";
import LobbyEntity from "./lobby.entity";

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