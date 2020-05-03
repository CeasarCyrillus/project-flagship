import { expect } from "chai";
import { Lobby } from "../../domain/lobby";
import { Fixture } from "../fixture";

describe("Lobby", () => {
    describe("id", () => {
        it("should throw error when shorter than 6 letters", () => {
            const shortId = "SHORT";

            expect(() => {
                new Lobby(shortId, Fixture.player);
            }).Throw("Lobby id have to be 6 letters or more")
        });

        it("should throw error when not only uppercase", () => {
            const id = "LongId";

            expect(() => {
                new Lobby(id, Fixture.player);
            }).Throw("Lobby id have to be uppercase");
        })
    });

    describe("description", () => {
        it("should have sensible default value based on id not defined", () => {
            const lobby = new Lobby(Fixture.lobbyId, Fixture.player);

            expect(lobby.description).to.be.equal(`Lobby for game #${Fixture.lobbyId}`);
        });

        it("should be customizable", () => {
            const expectedDescription = "Some other description";
            const lobby = new Lobby(Fixture.lobbyId, expectedDescription);
            lobby.description = expectedDescription;
            expect(lobby.description).to.be.equal(expectedDescription);
        });
    });

    describe("owner", () => {
        it("should throw error when undefined", () => {
            expect(() => {
                new Lobby(Fixture.lobbyId, Fixture.undefined);
            }).Throw("Lobby must have owner");
        });
    });
});