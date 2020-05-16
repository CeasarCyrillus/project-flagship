import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";
import { getFreePort } from 'https://deno.land/x/free_port@v1.2.0/mod.ts'
import { gray, italic } from "https://deno.land/std/fmt/colors.ts";

const runTestServer = async (resources: typeof Drash.Http.Resource[])=> {
    const server = new Drash.Http.Server({
        response_output: "application/json",
        resources: resources,
    });

    const port = await getFreePort(3000);

    await server.run({
        hostname: "localhost",
        port
      });
    
    return server;
}

export default runTestServer;