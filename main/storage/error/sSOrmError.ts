import { bgRed, white } from "https://deno.land/std/fmt/colors.ts";

class sSOrmError extends Error {
    constructor(message: string) {
        super(bgRed(white(message)));
    }
}

export default sSOrmError;