import Lobby from "../../domain/lobby.ts";
import { assertNotEquals, assertStrContains } from "https://deno.land/std/testing/asserts.ts"

Deno.test("Lobby has default lobby code", () => {
    const lobby = new Lobby();
    
    assertNotEquals(undefined, lobby.code);
    assertNotEquals(null, lobby.code);
    assertNotEquals(NaN, lobby.code);
})

Deno.test("Lobby description will contain code", () => {
    const lobby = new Lobby();
    assertStrContains(lobby.description, lobby.code.toString());
});