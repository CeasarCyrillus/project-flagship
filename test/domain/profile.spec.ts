import { Profile } from "../../domain/profile";
import { Tweet } from "../../domain/tweet";
import { Fixture } from "../fixture";
import { expect } from "chai";
describe("Profile", () => {
    it("username start with @", () => {
        const profile = Fixture.profile();

        expect(profile.username).equal(`@${Fixture.username}`);
    });
});