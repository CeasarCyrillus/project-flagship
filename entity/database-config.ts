import LobbyEntity from "./lobby.entity";
import { ConnectionOptions } from "typeorm";

const databaseConfig: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ceasarcyrillus",
    password: "admin",
    database: "ceasarcyrillus",
    entities: [
        LobbyEntity
    ],
    synchronize: true,
    logging: false
}

export default databaseConfig;