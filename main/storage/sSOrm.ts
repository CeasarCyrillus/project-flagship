import Lobby from "../domain/lobby.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import UpdateNonExistingEntityError from "./error/updateNonExistingEntityError.ts"
import MockEntity from "./test/mockEntity.ts";
import UseBeforeInitalizedError from "./error/useBeforeInitalizedError.ts";

export enum StorageLogLevel {
    all,
    onlyError,
};

export interface sSOrmConfig {
    inMemory?: boolean;
    logLevel?: StorageLogLevel;
};

export interface IEntity {
    id: string | null;
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
        //if(!entity.id || !this.find(entity.id!)) throw new UpdateNonExistingEntityError();
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

    private _created: boolean;
    public get created(): boolean {
        return this._created;
    }

    private repositories!: {[entityName: string]: Repository<IEntity>};
  
    constructor(storageConfig?: sSOrmConfig) {
        this.inMemory = storageConfig?.inMemory || true;
        this.logLevel = storageConfig?.logLevel || StorageLogLevel.all;
        this._created = false;
    }

    public init = (): void => {
        this.repositories = {};
        this._created = true;
    }

    private getExistingRepository(entityName: string): Repository<IEntity> | null {
        for(let [key, repository] of Object.entries(this.repositories)){
            if(key === entityName) return repository;
        }
        return null;
    }

    public getRepository<T extends IEntity>(respositoryName: string) {
        if(!this.created) throw new UseBeforeInitalizedError();
        const existingRepository = this.getExistingRepository(respositoryName);
        if(existingRepository === null) this.repositories[respositoryName] = new Repository<T>(this);
        return this.repositories[respositoryName] as Repository<T>;
    }
}

export default sSOrm;