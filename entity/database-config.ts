import { ConnectionOptions } from "typeorm";
import LobbyEntity from "./lobby.entity";
import PlayerEntity from "./player.entity";

export const developmentDatabaseConfig: ConnectionOptions = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "ceasarcyrillus",
    password: "",
    database: "dev-project-flagship",
    entities: [
        LobbyEntity,
        PlayerEntity
    ],
    synchronize: true,
    logging: false
}

export const testDatabaseConfig: ConnectionOptions = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "ceasarcyrillus",
    password: "",
    database: "test-project-flagship",
    entities: [
        LobbyEntity,
        PlayerEntity
    ],
    synchronize: true,
    logging: false
}