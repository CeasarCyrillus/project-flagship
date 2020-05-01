import { Tweet } from "../../domain/tweet"
import { Profile } from "../../domain/profile";
import { Fixture } from "../fixture";
describe("a tweet", () => {
    it("throws exception if text is more than 280 characters", () => {
        const veryLongText = "Lorem ipsum dolor sit amet," +
        "consectetur adipiscing elit. Nulla aliquam tellus et eleifend vehicula." +
        " Proin sapien neque, convallis sed justo at, accumsan auctor felis." + 
        " Praesent porta arcu nec nunc tempus semper. Vivamus vehicula justo" + 
        " condimentum, bibendum metus eget, sagittis augue. Mauris pretium gravida" +
        " lacus ut semper. Fusce vel pharetra diam. Praesent a odio augue. Aliquam" + 
        " massa nunc, accumsan in nunc vel, consequat elementum massa. Nullam" +
        " efficitur odio sed ipsum interdum elementum.";
        
        expect(() => {
            const tweet = new Tweet(Fixture.profile(), veryLongText);
        }).toThrowError("Tweet text must be less than 280 character");
    })
});