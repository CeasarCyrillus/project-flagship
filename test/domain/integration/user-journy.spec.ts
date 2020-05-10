import { chai } from "../../setup-tests";
import { app } from "../../../app";
import { Config } from "../../web/web.config";
import { expect } from "chai";
import { Lobby } from "../../../domain/lobby";
import { Fixture } from "../../fixture";
import { Player } from "../../../domain/player";
describe("Create and join a lobby", () => {

    const createLobby = (owner?: Player, id?: string, description?: string) => {
        if(!owner) owner = new Player(Fixture.username);
        return chai
            .request(app)
            .post(Config.baseUrlLobby)
            .type("application/x-www-form-urlencoded")
            .send({
                owner: owner,
                description: description,
                id: id
            });
    }

    const joinLobby = (lobbyId: string, player?: Player, ) => {
        if(player === undefined) player = Fixture.player();
        return chai
            .request(app)
            .patch(`${Config.baseUrlLobby}/${lobbyId}`)
            .send({
                player: player
            });
    }

    it("with default values", async () => {
        const createLobbyResponse = await createLobby();

        expect(createLobbyResponse.status).to.be.equal(201);

        const createdLobby: Lobby = createLobbyResponse.body;
        const createdLobbyId = createdLobby.id;
        
        
        expect(createdLobby.description).to.contain("Lobby for game #");

        const joinLobbyResponse = await joinLobby(createdLobbyId);
        
        expect(joinLobbyResponse.status).to.be.equal(200);
        expect(createdLobbyId).to.be.equal(joinLobbyResponse.body.id);
        expect(createLobbyResponse.body.owner.username).to.be.equal(Fixture.username);
    })

    it("with custom lobby id", async () => {  
        const id =  "MY-LOBBY-ID";
        const description = "Another weirdly boring generic description";
        const createLobbyResponse = await createLobby(new Player("myUsername3"), id, description);
        const createdLobby = createLobbyResponse.body;
        
        expect(createdLobby.id).to.be.equal(id);
        expect(createdLobby.description).to.be.equal(description);
    });

    it("with several users", async () => {
        const owner = new Player(Fixture.username);
        const player1 = new Player("WittySpider");
        const player2 = new Player("StressedHorse");

        const createLobbyResponse = await createLobby(owner);
        
        await joinLobby(createLobbyResponse.body.id, player1);
        const lobby = await joinLobby(createLobbyResponse.body.id, player2);

        expect(lobby.body.players).deep.contains(owner);
        expect(lobby.body.players).deep.contains(player1);
        expect(lobby.body.players).deep.contains(player2);

    });
});