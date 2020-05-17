import sSOrmError from "./sSOrmError.ts";

class InitalizedMultipleTimesError extends sSOrmError {
    constructor() {
        super("sSOrm was initalized several times. Create a new instance or use .reset()");
    }
}

export default InitalizedMultipleTimesError;