import { Drash } from "https://deno.land/x/drash@v1.0.0/mod.ts";
import InvalidLobbyCodeError from "../domain/error/invalidLobbyCodeError.ts";
import Lobby from "../domain/lobby.ts";
import InvalidLobbyOwnerError from "../domain/error/invalidLobbyOwnerError.ts";

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
      const owner = this.request.getBodyParam("owner")
      const code = this.request.getBodyParam("code");
      const description = this.request.getBodyParam("description")
      const lobby = new Lobby(owner, code, description);
      
      this.response.status_code = 201;
      this.response.body = {
        description: lobby.description,
        code: lobby.code.toString(),
        owner: lobby.owner
      }
  }
  catch(error){
    this.response.status_code = 400;
    if(error instanceof InvalidLobbyCodeError || error instanceof InvalidLobbyOwnerError) {
      this.response.body = {
        message: error.message
      }
    }
  }
  
  return this.response
  }
};
export default LobbyResource;