import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";
import LobbyResource from "./main/web/lobbyResource.ts";
import { getFreePort } from 'https://deno.land/x/free_port@v1.2.0/mod.ts'
import { green } from "https://deno.land/std/fmt/colors.ts";

const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [LobbyResource]
});

const port = await getFreePort(3000);
await server.run({
  hostname: "localhost",
  port
});

console.log(green("\nServer listening: http://localhost:" + port));