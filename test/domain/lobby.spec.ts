import { expect } from "chai";
import { Lobby } from "../../domain/lobby";

describe("lobby", () => {
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
    });
});