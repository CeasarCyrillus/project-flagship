import Lobby from "../../main/domain/lobby.ts";
import InvalidLobbyOwnerError from "../../main/domain/error/invalidLobbyOwnerError.ts";
import { assertNotEquals, assertStrContains, assertThrows } from "https://deno.land/std/testing/asserts.ts"
import { bgGreen, black, bgRed, yellow } from "https://deno.land/std/fmt/colors.ts";

//#region Lobby success
Deno.test(bgGreen(black("Lobby")), () => {});
Deno.test("\t has default lobby code", () => {
    const lobby = new Lobby("Owner1");
    
    assertNotEquals(undefined, lobby.code);
    assertNotEquals(null, lobby.code);
    assertNotEquals(NaN, lobby.code);
})

Deno.test("\t description will contain code", () => {
    const lobby = new Lobby("Owner1");
    assertStrContains(lobby.description, lobby.code.toString());
});
//#endregion

//#region Lobby fails
Deno.test(bgRed(yellow("Lobby")), () => {});
Deno.test("\t throws error without owner", () => {
    const undefinedOwner = new Array<string>()[0];

    assertThrows(() => {
      new Lobby(undefinedOwner);
    }, InvalidLobbyOwnerError, "Lobby must have owner");
});
//#endregion