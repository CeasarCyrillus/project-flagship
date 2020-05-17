import { IEntity } from "../../storage/sSOrm.ts";
class MockEntity implements IEntity{
    id!: string | null;
}

export default MockEntity;