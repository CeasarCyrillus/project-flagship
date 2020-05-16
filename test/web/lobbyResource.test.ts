import { assertEquals } from "https://deno.land/std/testing/asserts.ts"
import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";
import LobbyResource from "../../web/lobbyResource.ts"

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [
    LobbyResource
  ],
});

Deno.test("Lobby resource returns 404", async () => {

  await server.run({
    hostname: "localhost",
    port: 5050
  });
    
  const response = await fetch("http://localhost:5050/lobby/1337");

  await response.json();

  assertEquals(response.status,  404);
  server.close();
  
})
