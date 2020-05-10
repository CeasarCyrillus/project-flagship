import { createConnection, ConnectionOptions, Connection, Repository } from "typeorm";
import { developmentDatabaseConfig, testDatabaseConfig } from "./database-config";
import LobbyEntity from "./entity/lobby.entity";
import { Lobby } from "../domain/lobby";
import { Player } from "../domain/player";
import PlayerEntity from "./entity/player.entity";
export const getDatabaseConnection = (environment : string) => {
    if(environment === "development") {
        return developmentDatabaseConfig;
    } else if(environment === "test") {
        return testDatabaseConfig;
    }

    throw new Error("Unknown environment: " + environment);
}

export const connectDatabase = async (config: ConnectionOptions): Promise<Service> => {
    const connection = await createConnection(config);
    return new Service(connection);
}


class LobbyRepository {
    private repository: Repository<LobbyEntity>;
    constructor(conn: Connection) {
        this.repository = conn.getRepository(LobbyEntity);
    }

    private toEntity = (lobby: Lobby) => {
        const entity = new LobbyEntity();
        entity.code = lobby.code;
        entity.description = lobby.description;

        const owner = new PlayerEntity();
        owner.username = lobby.owner.username;
        entity.owner = owner;

        return entity;
    }

    private toDomain = (entity: LobbyEntity) => {
        const owner = new Player(entity.owner.username);
        const lobby = new Lobby(entity.code, owner, entity.description);
        lobby.id = entity.id;
        return lobby;
    }

    private save = async (lobby: LobbyEntity) => this.repository.save(lobby);

    public add = async (lobby: Lobby) => {
        const entity = await this.save(this.toEntity(lobby))
        lobby.id = entity.id;
        return lobby;
    };

    public getByCode = async (code: string): Promise<Lobby | undefined> => {
        const entity = await this.repository.findOne({ where: {
            code: code
        },
        relations: ["owner"]}
        );

        if(entity === undefined) return undefined;
        return this.toDomain(entity);
    }
    
    public removeAll = async () => {
        const allLobbies = await this.repository.find();
        await this.repository.remove(allLobbies);
    }

    public update = async (lobby: Lobby) => {
        const entity = this.toEntity(lobby);
        entity.id = lobby.id;
        this.save(entity);
    }
}

class Service {
    public lobbyRepository: LobbyRepository;
    constructor(conn: Connection){
        this.lobbyRepository = new LobbyRepository(conn);
    }
}