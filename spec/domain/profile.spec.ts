import { Profile } from "../../domain/profile";
import { Tweet } from "../../domain/tweet";
import { Fixture } from "../fixture";
describe("profile", () => {
    it("username start with @", () => {
        const profile = Fixture.profile();

        expect(profile.username).toBe(`@${Fixture.username}`)
    });
});