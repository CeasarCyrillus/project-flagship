import { expect } from "chai";
import { Lobby } from "../../domain/lobby";
import { Fixture } from "../fixture";
import { Player } from "../../domain/player";

describe("Lobby", () => {
    describe("id", () => {
        it("should throw error when shorter than 6 letters", () => {
            const shortId = "SHORT";

            expect(() => {
                new Lobby(shortId, Fixture.player());
            }).Throw("Lobby id have to be 6 letters or more")
        });

        it("should throw error when not only uppercase", () => {
            const id = "LongId";

            expect(() => {
                new Lobby(id, Fixture.player());
            }).Throw("Lobby id have to be uppercase");
        })

        it("should have random default value", () => {
            const lobby = new Lobby(Fixture.undefined, Fixture.player())
            
            expect(lobby.code).to.not.be.undefined;
        })
    });

    describe("description", () => {
        it("should have sensible default value based on id not defined", () => {
            const lobby = new Lobby(Fixture.lobbyCode, Fixture.player());

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
        it("should throw error when undefined", () => {
            expect(() => {
                new Lobby(Fixture.lobbyCode, Fixture.undefined);
            }).Throw("Lobby must have owner");
        });

        it("should be added to players list", () => {
            const owner = new Player(Fixture.username);
            
            const lobby = new Lobby(Fixture.lobbyCode, owner);
            expect(lobby.players).contain(owner);
        })
    });
});