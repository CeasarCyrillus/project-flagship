import { expect } from "chai";
import { Lobby } from "../../domain/lobby";

describe("lobby", () => {
    it("should have unique id when created", () => {
        const usedIds = new Array<string>();
        for (let i = 0; i < 8000; i++) {
            usedIds.push(new Lobby().id);
        }
        const uniqueIds = new Set(usedIds).size;
        
        expect(usedIds.length).to.be.equal(uniqueIds);
    });
});