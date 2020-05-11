import { ConnectionOptions } from "typeorm";
import LobbyEntity from "./entity/lobby.entity";
import PlayerEntity from "./entity/player.entity";

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
    type: "sqlite",
    database: ":memory:",
    entities: [
        LobbyEntity,
        PlayerEntity
    ],
    synchronize: true,
    logging: false
}