import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";

class LobbyResource extends Drash.Http.Resource{
    static paths = [
        "/lobby/:id"
    ];

    public GET() {
        this.response.status_code = 404;
        return this.response;
    }
};

export default LobbyResource;