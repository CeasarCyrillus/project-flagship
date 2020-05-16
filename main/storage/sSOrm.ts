import Lobby from "../domain/lobby.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

enum StorageLogLevel {
    all,
    onlyError,
};

export interface sSOrmConfig {
    inMemory?: boolean;
    logLevel?: StorageLogLevel;
};

export interface IEntity {
    id?: string | null;
};

class Repository<T extends IEntity> {
    private storage: sSOrm;
    private data: { [id: string]: T;}
    constructor(storage: sSOrm){
        this.storage = storage;
        this.data = {};
    };

    public add(entity: T) {
        // Todo: throw error/warning when adding entity with id != null or undefined
        const id = v4.generate();
        entity.id = id;
        this.data[entity.id] = entity;
        return id;
    }

    public find(id: string): T | null {
        return this.data[id] || null;
    }

    public update(entity: T) {
        // Todo: throw error if id is undefined | id can't be found
        this.data[entity.id!] = entity;
    }


}


class sSOrm {
    public readonly inMemory: boolean;
    public readonly logLevel: StorageLogLevel;
    public readonly created: boolean;

    private readonly repositories: {[entityName: string]: Repository<IEntity>};
  
    constructor(storageConfig?: sSOrmConfig) {
        this.inMemory = storageConfig?.inMemory || true;
        this.logLevel = storageConfig?.logLevel || StorageLogLevel.all;
        this.created = false;
        this.repositories = {};
    }

    private getExistingRepository(entityName: string): Repository<IEntity> | null {
        for(let [key, repository] of Object.entries(this.repositories)){
            if(key === entityName) return repository;
        }
        return null;
    }

    private createNewRepository(entity: Function & IEntity): void {
        this.repositories[entity.name] = new Repository<typeof entity>(this);
    }

    public getRepository(entity: Function&IEntity) {
        const existingRepository = this.getExistingRepository(entity.name);
        if(existingRepository === null) this.createNewRepository(entity);
        return this.repositories[entity.name];
    }
}

const db = new sSOrm();
const repo = db.getRepository(Lobby);

const lobby = new Lobby("Ceasar");

const id = repo.add(lobby);
const storedLobby = repo.find(id);

console.log(storedLobby)

lobby.description = "Some other boring description";
repo.update(lobby);

console.log(repo.find(id));