import Lobby from "../../domain/lobby.ts";
import InvalidLobbyCodeError from "../../domain/exceptions/invalidLobbyCode.ts";
import { assertNotEquals, assertThrows, assertStrContains } from "https://deno.land/std/testing/asserts.ts"

//#region Lobby
Deno.test("Lobby has default lobby code", () => {
    const lobby = new Lobby();
    
    assertNotEquals(undefined, lobby.code);
    assertNotEquals(null, lobby.code);
    assertNotEquals(NaN, lobby.code);
})

Deno.test("Lobby code have to be 6 letters or more", () =>
{
    assertThrows(() => {
        const lobby = new Lobby("BAD");
    }, InvalidLobbyCodeError, "Lobby code have to be 6 letters or more")
});

Deno.test("Lobby code have to be uppercase", () =>
{
    assertThrows(() => {
        const lobby = new Lobby("bAdCustomCode");
    }, InvalidLobbyCodeError, "Lobby code have to be uppercase")
});

Deno.test("Lobby description will contain code", () => {
    const lobby = new Lobby();
    assertStrContains(lobby.description, lobby.code);
});


//#endregion