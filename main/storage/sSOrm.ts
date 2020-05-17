import { v4 } from "https://deno.land/std/uuid/mod.ts";
import InitalizedMultipleTimesError from "./error/initalizedMultipleTimesError.ts"
import UseBeforeInitalizedError from "./error/useBeforeInitalizedError.ts";
import EntityNotFoundError from "./error/entityNotFoundError.ts";

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
        this.data[id] = JSON.parse(JSON.stringify(entity)) as T;
        entity.id = id;
        return id;
    }

    public find(id: string): T | null {
        const entity = this.data[id];
        if(entity === undefined) return null;
        return JSON.parse(JSON.stringify(entity)) as T;
    }

    public findOrThrow(id: string): T {
        const entity = this.find(id);
        if(entity === null) throw new EntityNotFoundError();
        return entity;
    }

    public update(entity: T) {
        if(!entity.id || !this.find(entity.id)) throw new EntityNotFoundError()
        this.data[entity.id!] = entity;
    }

    public findAll(condition: (entity: T) => boolean): T[] {
        return Object.values(this.data).filter((entity) => condition(entity));
    }

    public delete(id: string) {
        if(!id || !this.data[id]) throw new EntityNotFoundError();
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

    public reset = (): void => {
        this._created = false;
        this.init();
    } 

    public init = (): void => {
        if(this.created) throw new InitalizedMultipleTimesError();
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