import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";
import LobbyResource from "../../main/web/lobbyResource.ts"
import runTestServer from "../web/testServer.ts";


Deno.test("Lobby resource returns 404", async () => {
  const server = await runTestServer([LobbyResource]);

  const response = await fetch(`http://localhost:${server.port}/lobby/0`);

  await response.json();
  assertEquals(response.status,  404);
  server.close();
  
})
