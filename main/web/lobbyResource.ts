import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";
import InvalidLobbyCodeError from "../domain/exceptions/invalidLobbyCode.ts";
import Lobby from "../domain/lobby.ts";

class LobbyResource extends Drash.Http.Resource{
  static paths = [
      "/lobby",
      "/lobby/:id",
  ];

  public GET() {
    this.response.status_code = 404;
    return this.response;
  }

  public POST = async () => {
    try {
      const lobby = new Lobby(this.request.getBodyParam("code"), this.request.getBodyParam("description"));
      this.response.status_code = 201;
      this.response.body = {
        description: lobby.description,
        code: lobby.code.toString()
      }
  }
  catch(error){
    if(error instanceof InvalidLobbyCodeError) {
      this.response.status_code = 400;

    }
  }
  
  return this.response
  }
};
export default LobbyResource;