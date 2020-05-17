import sSOrmError from "./sSOrmError.ts";

class UseBeforeInitalizedError extends sSOrmError {
    constructor() {
        super("Before getting a repository, initalize sSOrm with .init()");
    }
}

export default UseBeforeInitalizedError;