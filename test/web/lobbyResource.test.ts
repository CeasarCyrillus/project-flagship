import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import LobbyResource from "../../main/web/lobbyResource.ts";
import runTestServer from "../web/testServer.ts";
import Lobby from "../../main/domain/lobby.ts";
import { bgGreen, black, yellow, bgRed } from "https://deno.land/std/fmt/colors.ts";

const lobbyResourceRequest = (method: "POST", lobby?: {code?: string, description?: string, owner?: string }) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: lobby?.code || "DEFAULT-CODE",
      description: lobby?.description || "default description",
      owner: lobby?.owner || "DudeMan"
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
  const lobby = new Lobby("Owner 1", undefined, "simple description!");

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", { description: lobby.description }));
  server.close();
  const responseBody = await response.json() as Lobby;

  assertEquals(responseBody.description,  lobby.description);
});


Deno.test("\t with custom lobby code", async () => {
  const server = await runTestServer([LobbyResource]);
  const lobby = new Lobby("Owner 1", "MY-LOBBY-CODE");

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", { code: lobby.code.toString() }));
  server.close();
  const responseBody = await response.json() as Lobby;

  assertEquals(responseBody.code,  lobby.code.toString());
});

Deno.test("\t with owner", async () => {
  const server = await runTestServer([LobbyResource]);
  const lobby = new Lobby("Owner 1", undefined, "simple description!");

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", { owner: lobby.owner }));
  server.close();
  const responseBody = await response.json() as Lobby;

  assertEquals(responseBody.owner,  lobby.owner);
});

//#endregion

//#region Fails
Deno.test(bgRed(yellow("Create lobby enpoint")), () => {});
Deno.test("\t without valid lobby code", async () => {
  const server = await runTestServer([LobbyResource]);

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", {code: "iNvAlId-CoDe"}));
  const responseBody = await response.json();
  server.close();

  assertEquals(response.status,  400);
  assertEquals(responseBody.message, "Lobby code have to be uppercase");
});

Deno.test("\t without valid lobby code", async () => {
  const server = await runTestServer([LobbyResource]);

  const response = await fetch(`http://localhost:${server.port}/lobby`,  lobbyResourceRequest("POST", { code: "BAD" }));
  server.close();
  const responseBody = await response.json();

  assertEquals(response.status,  400);
  assertEquals(responseBody.message, "Lobby code have to be 6 letters or more");
});

Deno.test("\t without owner", async () => {
  const server = await runTestServer([LobbyResource]);

  const response = await fetch(`http://localhost:${server.port}/lobby`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: "{}"
  });

  server.close();
  const responseBody = await response.json();

  assertEquals(response.status,  400);
  assertEquals(responseBody.message, "Lobby must have owner");
});
//#endregion