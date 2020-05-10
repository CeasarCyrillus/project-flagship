import { ConnectionOptions } from "typeorm";

const databaseConfig: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ceasarcyrillus",
    password: "admin",
    database: "ceasarcyrillus",
    entities: [
        __dirname + "*.ts"
    ],
    synchronize: true,
    logging: false
}

export default databaseConfig;