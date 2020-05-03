import { expect } from "chai";
import { Player } from "../../domain/player";
describe("Player", () => {
    it("throws exception if name is less than 6 letters", () => {
        expect(() => {
            new Player("short");
        }).Throw("Username must be 6 character or more")
    });
});