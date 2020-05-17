import sSOrm, { Provider, IEntity, StorageLogLevel, sSOrmLogInfo } from "./sSOrm.ts";
import { ensureFileSync } from "https://deno.land/std/fs/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import EntityNotFoundError from "../storage/error/entityNotFoundError.ts";

class Repository<T extends IEntity> {
    private data: { [id: string]: T;} 
    public fileName: string | null = null;
    public logLevel: StorageLogLevel;
    private provider: Provider;
    constructor(provider: Provider, logLevel: StorageLogLevel, repositoryName: string){
        this.data = {};
        this.logLevel = logLevel;
        this.provider = provider;
        
        // Todo create inheriting repository based on provider type?
        if(provider === Provider.file) {
            this.fileName = `${repositoryName}.json`;
            ensureFileSync(this.fileName);
        }
    };
    
    private logInfo = () => this.logLevel === StorageLogLevel.all;

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

        // Todo create inheriting repository based on provider type?
        if(this.provider === Provider.file) Deno.removeSync(this.fileName!);
    }
}

export default Repository;