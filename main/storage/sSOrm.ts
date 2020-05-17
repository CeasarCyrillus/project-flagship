
import InitalizedMultipleTimesError from "./error/initalizedMultipleTimesError.ts"
import UseBeforeInitalizedError from "./error/useBeforeInitalizedError.ts";
import { gray, italic } from "https://deno.land/std/fmt/colors.ts";
import Repository from "./repository.ts";

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
            this.repositories[repositoryName] = new Repository<T>(this.provider, this.logLevel, repositoryName);
            if(this.logInfo()) sSOrmLogInfo(`created repository '${repositoryName}'`);
        }
        if(this.logInfo()) sSOrmLogInfo(`get repository '${repositoryName}'`);
        return this.repositories[repositoryName] as Repository<T>;
    }
}

export default sSOrm;