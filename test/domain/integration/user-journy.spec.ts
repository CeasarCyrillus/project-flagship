import { chai } from "../../setup-tests";
import { app } from "../../../app";
import { Config } from "../../web/web.config";
import { expect } from "chai";
import { Lobby } from "../../../domain/lobby";
import { Fixture } from "../../fixture";
import { Player } from "../../../domain/player";
describe("Create and join a lobby", () => {
    const createLobby = (owner?: Player, code?: string, description?: string) => {
        if(!owner) owner = new Player(Fixture.username);
        return chai
            .request(app)
            .post(Config.baseUrlLobby)
            .type("application/x-www-form-urlencoded")
            .send({
                owner: owner,
                description: description,
                code: code
            });
    }

    const joinLobby = (lobbyCode: string, player?: Player, ) => {
        if(player === undefined) player = Fixture.player();
        return chai
            .request(app)
            .patch(`${Config.baseUrlLobby}/${lobbyCode}`)
            .send({
                player: player
            });
    }

    it("with default values", async () => {
        const createLobbyResponse = await createLobby();

        expect(createLobbyResponse.status).to.be.equal(201);

        const createdLobby: Lobby = createLobbyResponse.body;
        const createdLobbyCode = createdLobby.code;
        
        
        expect(createdLobby.description).to.contain("Lobby for game #");

        const joinLobbyResponse = await joinLobby(createdLobbyCode);
        
        expect(joinLobbyResponse.status).to.be.equal(200);
        expect(createLobbyResponse.body.id).to.be.equal(joinLobbyResponse.body.id);
        expect(createdLobbyCode).to.be.equal(joinLobbyResponse.body.code);
        expect(createLobbyResponse.body.owner.username).to.be.equal(Fixture.username);
    })

    it("with custom lobby id", async () => {  
        const code =  "MY-LOBBY-CODE";
        const description = "Another weirdly boring generic description";
        const createLobbyResponse = await createLobby(new Player("myUsername3"), code, description);
        expect(createLobbyResponse.status).to.be.equal(201);
        const createdLobby = createLobbyResponse.body;
        
        expect(createdLobby.code).to.be.equal(code);
        expect(createdLobby.description).to.be.equal(description);
    });

    it("with several users", async () => {
        const owner = new Player("Owner1");
        const player1 = new Player("Player1");
        const player2 = new Player("Player2");

        const createLobbyResponse = await createLobby(owner);
        
        let lobby = await joinLobby(createLobbyResponse.body.code, player1);
        lobby = await joinLobby(createLobbyResponse.body.code, player2);
        console.log(lobby.body.players);
        expect(lobby.body.players).deep.contains(owner);
        //expect(lobby.body.players[1]).deep.contains(player1);
        //expect(lobby.body.players[2]).deep.contains(player2);

    });
});