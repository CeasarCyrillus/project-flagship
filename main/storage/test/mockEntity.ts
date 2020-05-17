import { IEntity } from "../../storage/sSOrm.ts";
class MockEntity implements IEntity{
    id!: string | null;
    simpleStringField: string;
    simpleList: string[];
    undefined: string | undefined;
    null: number | null;
    NaN: number | typeof NaN;
    infinity: number;
    signedInfinity: number;
    complexNightmareList: MockEntity[];
    
    constructor() {
        this.simpleStringField = "Hello, World!";
        this.simpleList = new Array();
        this.complexNightmareList = new Array();
        this.undefined = undefined;
        this.null = null;
        this.NaN = NaN;
        this.infinity = Infinity;
        this.signedInfinity = -Infinity;
    }
}

export default MockEntity;