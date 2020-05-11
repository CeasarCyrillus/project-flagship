import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity, ManyToOne } from "typeorm";
import LobbyEntity from "./lobby.entity";

@Entity()
class PlayerEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public isOwner: boolean

    @ManyToOne(type => LobbyEntity, lobby => lobby.players)
    public lobby: LobbyEntity;

    constructor(username: string, isOwner: boolean) {
        this.username = username;
        this.isOwner = isOwner;
    }
}

export default PlayerEntity;