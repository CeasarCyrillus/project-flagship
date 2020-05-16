import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";

class HomeResource extends Drash.Http.Resource {
  static paths = ["/"];
  public GET() {
    this.response.body = "Hello World! deno + Drash is cool!";
    return this.response;
  }
}

const server = new Drash.Http.Server({
  response_output: "text/html",
  resources: [HomeResource]
});

server.run({
  hostname: "localhost",
  port: 1447
});

console.log("Server listening: http://localhost:1447");