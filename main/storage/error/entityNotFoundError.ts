import sSOrmError from "./sSOrmError.ts";

class EntityNotFoundError extends sSOrmError {
    constructor() {
        super("Expected entity does not exist");
    }
}

export default EntityNotFoundError;