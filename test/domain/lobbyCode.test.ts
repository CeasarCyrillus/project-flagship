import InvalidLobbyCodeError from "../../domain/exceptions/invalidLobbyCode.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts"
import LobbyCode from "../../domain/lobbyCode.ts";

Deno.test("Lobby code have to be 6 letters or more", () =>
{
    assertThrows(() => {
        const lobby = new LobbyCode("BAD");
    }, InvalidLobbyCodeError, "Lobby code have to be 6 letters or more")
});

Deno.test("Lobby code have to be uppercase", () =>
{
    assertThrows(() => {
        const lobby = new LobbyCode("bAdCustomCode");
    }, InvalidLobbyCodeError, "Lobby code have to be uppercase")
});
