import { ConnectionOptions } from "typeorm";
import LobbyEntity from "./lobby.entity";
import PlayerEntity from "./player.entity";

const databaseConfig: ConnectionOptions = {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "ceasarcyrillus",
    password: "",
    database: "project-flagship",
    entities: [
        LobbyEntity,
        PlayerEntity
    ],
    synchronize: true,
    logging: false
}

export default databaseConfig;