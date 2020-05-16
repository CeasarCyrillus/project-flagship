import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import LobbyResource from "../../main/web/lobbyResource.ts";
import runTestServer from "../web/testServer.ts";
import Lobby from "../../main/domain/lobby.ts";
import { bgGreen, black, yellow, bgRed } from "https://deno.land/std/fmt/colors.ts";

const lobbyResourceRequest = (method: "POST", code?: string, description?: string) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: code || "DEFAULT-CODE",
      description: description || "default description"
    })
  }
}
//#region Successful
Deno.test(bgGreen(black("Create lobby enpoint")), () => {});
Deno.test("\t with default values", async () => {
  const server = await runTestServer([LobbyResource]);

  const response = await fetch(`http://localhost:${server.port}/lobby`, lobbyResourceRequest("POST"));
  server.close();
  await response.json();

  assertEquals(response.status,  201);
});

Deno.test("\t with custom description", async () => {
  const server = await runTestServer([LobbyResource]);
  const lobby = new Lobby(undefined, "simple description!");

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", lobby.code.toString(), lobby.description));
  server.close();
  const responseBody = await response.json() as Lobby;

  assertEquals(responseBody.description,  lobby.description);
});


Deno.test("\t with custom lobby code", async () => {
  const server = await runTestServer([LobbyResource]);
  const lobby = new Lobby("MY-LOBBY-CODE");

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", lobby.code.toString(), lobby.description));
  server.close();
  const responseBody = await response.json() as Lobby;

  assertEquals(responseBody.code,  lobby.code.toString());
});

//#endregion

//#region Fails
Deno.test(bgRed(yellow("Create lobby enpoint")), () => {});
Deno.test("\t without valid lobby code", async () => {
  const server = await runTestServer([LobbyResource]);

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", "iNvAlId-CoDe"));
  const responseBody = await response.json();
  server.close();

  assertEquals(response.status,  400);
  assertEquals(responseBody.message, "Lobby code have to be uppercase");
});

Deno.test("\t without valid lobby code", async () => {
  const server = await runTestServer([LobbyResource]);

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", "BAD"));
  server.close();
  const responseBody = await response.json();

  assertEquals(response.status,  400);
  assertEquals(responseBody.message, "Lobby code have to be 6 letters or more");
});
//#endregion