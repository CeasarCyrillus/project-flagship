import Lobby from "../domain/lobby.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import UpdateNonExistingEntityError from "./error/updateNonExistingEntityError.ts"

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
        const id = v4.generate();
        entity.id = id;
        this.data[entity.id] = entity;
        return id;
    }

    public find(id: string): T | null {
        return this.data[id] || null;
    }

    public update(entity: T) {
        if(!entity.id || !this.find(entity.id!)) throw new UpdateNonExistingEntityError();
        this.data[entity.id!] = entity;
    }

    public findAll(condition: (entity: T) => boolean): T[] {
        return Object.values(this.data).filter((entity) => condition(entity));
    }

    public delete(id: string) {
        // Todo: throw error if id is undefined | id can't be found
        delete this.data[id];
    }

    public drop() {
        this.data = {};
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

    public getRepository<T>(name: string) {
        const existingRepository = this.getExistingRepository(name);
        if(existingRepository === null) this.repositories[name] = new Repository<T>(this);
        return this.repositories[name] as Repository<T>;
    }
}

const db = new sSOrm();
const repo = db.getRepository<Lobby>(Lobby.name);

const lobby = new Lobby("Ceasar");

const id = repo.add(lobby);
const storedLobby = repo.find(id);

console.log(lobby)

repo.update(lobby);

console.log(repo.find(id));