import sSOrmError from "./sSOrmError.ts";

class UpdateNonExistingEntityError extends sSOrmError {
    constructor() {
        super("Trying to update non existing entity. Add the entity first");
    }
}

export default UpdateNonExistingEntityError;