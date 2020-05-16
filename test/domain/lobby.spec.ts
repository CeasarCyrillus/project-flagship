import { expect } from "chai";
import { Lobby } from "../../domain/lobby";
import { Fixture } from "../fixture";
import { Player } from "../../domain/player";

describe("Lobby", () => {
    describe("id", () => {
        it("should throw error when shorter than 6 letters", () => {
            const shortId = "SHORT";

            expect(() => {
                new Lobby(shortId);
            }).Throw("Lobby id have to be 6 letters or more")
        });

        it("should throw error when not only uppercase", () => {
            const id = "LongId";

            expect(() => {
                new Lobby(id);
            }).Throw("Lobby id have to be uppercase");
        })

        it("should have random default value", () => {
            const lobby = new Lobby(Fixture.undefined)
            
            expect(lobby.code).to.not.be.undefined;
        })
    });

    describe("description", () => {
        it("should have sensible default value based on id not defined", () => {
            const lobby = new Lobby(Fixture.lobbyCode);

            expect(lobby.description).to.be.equal(`Lobby for game #${Fixture.lobbyCode}`);
        });

        it("should be customizable", () => {
            const expectedDescription = "Some other description";
            const lobby = Fixture.lobbby();
            lobby.description = expectedDescription;
            expect(lobby.description).to.be.equal(expectedDescription);
        });
    });

    describe("owner", () => {
        it("should be added to players list", () => {
            const lobby = new Lobby(Fixture.lobbyCode);
            lobby.owner = new Player(Fixture.username);
            
            expect(lobby.getPlayers()).contain(lobby.owner);
        })
    });

    describe("players", () => {
        it("should throw error when duplicated username", () => {
            const lobby = new Lobby(Fixture.lobbyCode);
            lobby.owner = Fixture.player();
            expect(() => {
                lobby.addPlayer(Fixture.player());
            }).Throw("Username isn't unique");
        });
    })
});