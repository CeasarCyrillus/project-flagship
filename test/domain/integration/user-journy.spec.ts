import { chai } from "../../setup-tests";
import { app } from "../../../app";
import { Config } from "../../web/web.config";
import { expect } from "chai";
import { Lobby } from "../../../domain/lobby";
describe("Create and join a lobby", () => {
    it("should be possible", async () => {
        const createLobbyResponse = await chai
            .request(app)
            .post(Config.baseUrlLobby);

        expect(createLobbyResponse.status).to.be.equal(201);

        const createdLobby: Lobby = createLobbyResponse.body;
        const createdLobbyId = createdLobby.id;
        
        
        expect(createdLobby.description).to.contain("Lobby for game #");

        const joinLobbyResponse = await chai
            .request(app)
            .get(`${Config.baseUrlLobby}/${createdLobbyId}`);
        expect(joinLobbyResponse.status).to.be.equal(200);

        expect(createdLobbyId).to.be.equal(joinLobbyResponse.body.id);
        
    })
});