import InvalidLobbyCodeError from "../../main/domain/exceptions/invalidLobbyCode.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts"
import LobbyCode from "../../main/domain/lobbyCode.ts";

Deno.test("Lobby code have to be 6 letters or more", () =>
{
    assertThrows(() => {
        new LobbyCode("BAD");
    }, InvalidLobbyCodeError, "Lobby code have to be 6 letters or more")
});

Deno.test("Lobby code have to be uppercase", () =>
{
    assertThrows(() => {
        new LobbyCode("bAdCustomCode");
    }, InvalidLobbyCodeError, "Lobby code have to be uppercase")
});
