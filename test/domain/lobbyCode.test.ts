import InvalidLobbyCodeError from "../../main/domain/error/invalidLobbyCodeError.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts"
import LobbyCode from "../../main/domain/lobbyCode.ts";
import { bgGreen, black, yellow, bgRed } from "https://deno.land/std/fmt/colors.ts";

Deno.test(bgRed(yellow("Lobby code")), () => {});
Deno.test("\t throws if 6 letters or less", () =>
{
    assertThrows(() => {
        new LobbyCode("BAD");
    }, InvalidLobbyCodeError, "Lobby code have to be 6 letters or more")
});

Deno.test("\t throws if not uppercase", () =>
{
    assertThrows(() => {
        new LobbyCode("bAdCustomCode");
    }, InvalidLobbyCodeError, "Lobby code have to be uppercase")
});
