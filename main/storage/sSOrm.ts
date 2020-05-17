import { v4 } from "https://deno.land/std/uuid/mod.ts";
import InitalizedMultipleTimesError from "./error/initalizedMultipleTimesError.ts"
import UseBeforeInitalizedError from "./error/useBeforeInitalizedError.ts";
import EntityNotFoundError from "./error/entityNotFoundError.ts";
import { gray, italic } from "https://deno.land/std/fmt/colors.ts";
import { ensureFile, ensureFileSync, ensureDir, ensureDirSync } from "https://deno.land/std/fs/mod.ts";

export enum StorageLogLevel {
    all,
    onlyError,
};

export enum Provider {
    inMemory,
    file
};

export interface sSOrmConfig {
    provider?: Provider;
    logLevel?: StorageLogLevel;
};

export interface IEntity {
    id: string | null;
};

export const sSOrmLogInfo = (message: string) => {
    const now = new Date().toUTCString();
    console.info(gray(italic(`${now}\t|\t${message}`)));
}

class Repository<T extends IEntity> {
    private storage: sSOrm;
    private data: { [id: string]: T;} 
    public fileName: string | null = null;
    constructor(storage: sSOrm, repositoryName: string){
        this.storage = storage;
        this.data = {};
        
        if(this.storage.provider === Provider.file) {
            this.fileName = `${repositoryName}.json`;
            ensureFileSync(this.fileName);
        }
    };
    
    private logInfo = () => this.storage.logLevel === StorageLogLevel.all;
    public add(entity: T) {
        const id = v4.generate();
        this.data[id] = JSON.parse(JSON.stringify(entity)) as T;
        entity.id = id;
        if(this.logInfo()) sSOrmLogInfo(`added entity with id '${id}'`);
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
        if(this.logInfo()) sSOrmLogInfo(`updated entity with id '${entity.id}'`);
        this.data[entity.id] = entity;
    }

    public findAll(condition: (entity: T) => boolean): T[] {
        return Object.values(this.data).filter((entity) => condition(entity));
    }

    public delete(id: string) {
        if(!id || !this.data[id]) throw new EntityNotFoundError();
        delete this.data[id];
        if(this.logInfo()) sSOrmLogInfo(`deleted entity with id '${id}'`);
    }

    public drop(): void {
        this.data = {};
        if(this.storage.provider === Provider.file) Deno.removeSync(this.fileName!);
    }
}

class sSOrm {
    public readonly provider: Provider;
    public readonly logLevel: StorageLogLevel;
    private logInfo = () => this.logLevel === StorageLogLevel.all;

    private _created: boolean;
    public get created(): boolean {
        return this._created;
    }

    private repositories!: {[entityName: string]: Repository<IEntity>};
  
    constructor(storageConfig: sSOrmConfig = {
        provider: Provider.inMemory,
        logLevel: StorageLogLevel.onlyError
    }) {
        this.provider = storageConfig.provider || Provider.inMemory;
        this.logLevel = storageConfig.logLevel || StorageLogLevel.onlyError;
        this._created = false;
    }

    public reset = (): void => {
        this._created = false;
        this.init();
        if(this.logInfo()) sSOrmLogInfo(`reset storage`);
    } 

    public init = (): void => {
        if(this.created) throw new InitalizedMultipleTimesError();
        this.repositories = {};
        this._created = true;
        if(this.logInfo()) sSOrmLogInfo(`created storage`);
    }

    private getExistingRepository(entityName: string): Repository<IEntity> | null {
        for(let [key, repository] of Object.entries(this.repositories)){
            if(key === entityName) return repository;
        }
        return null;
    }

    public getRepository<T extends IEntity>(repositoryName: string) {
        if(!this.created) throw new UseBeforeInitalizedError();
        const existingRepository = this.getExistingRepository(repositoryName);
        if(existingRepository === null){
            this.repositories[repositoryName] = new Repository<T>(this, repositoryName);
            if(this.logInfo()) sSOrmLogInfo(`created repository '${repositoryName}'`);
        }
        if(this.logInfo()) sSOrmLogInfo(`get repository '${repositoryName}'`);
        return this.repositories[repositoryName] as Repository<T>;
    }
}

export default sSOrm;