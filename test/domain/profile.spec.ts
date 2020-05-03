import { Fixture } from "../fixture";
import { expect } from "chai";
describe("Profile", () => {
    it("username start with @", () => {
        const profile = Fixture.profile();

        expect(profile.username).equal(`@${Fixture.profileName}`);
    });
});