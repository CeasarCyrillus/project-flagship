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
    private connection: Connection;
    constructor(conn: Connection) {
        this.repository = conn.getRepository(LobbyEntity);
        this.connection = conn;
    }

    private toEntity = (lobby: Lobby) => {
        const entity = new LobbyEntity();
        entity.code = lobby.code;
        entity.description = lobby.description;

        entity.players = lobby.getPlayers().map(player => {
            const isOwner = player.username === lobby.owner.username;
            return new PlayerEntity(player.username, isOwner);
        });

        return entity;
    }

    private toDomain = (entity: LobbyEntity) => {
        const lobby = new Lobby(entity.code, entity.description);

        entity.players.forEach(playerEntity => {
            const player = new Player(playerEntity.username);
            if(playerEntity.isOwner) {
                lobby.owner = player;
            } else {
                lobby.addPlayer(player);
            }
        });

        lobby.id = entity.id;
        return lobby;
    }

    private save = async (lobby: LobbyEntity) => this.repository.save(lobby);

    public add = async (lobby: Lobby): Promise<Lobby> => {
        const entity = await this.save(this.toEntity(lobby))
        lobby.id = entity.id;
        return lobby;
    };

    public getByCode = async (code: string): Promise<Lobby | undefined> => {
        const entity = await this.repository.findOne({ where: {
            code: code
        }, 
        relations: ["players"]});

        if(entity === undefined) return undefined;
        return this.toDomain(entity);
    }
    
    public removeAll = async () => {
        const allLobbies = await this.repository.find();
        await this.repository.remove(allLobbies);
    }

    public update = async (lobby: Lobby): Promise<Lobby> => {
        const entity = this.toEntity(lobby);
        entity.id = lobby.id;
        await this.save(entity);

        return this.toDomain(entity);
    }


    public dropTable = (): Promise<void> => {
        return this.connection.dropDatabase();
    }
}

class Service {
    public lobbyRepository: LobbyRepository;
    constructor(conn: Connection){
        this.lobbyRepository = new LobbyRepository(conn);
    }
}