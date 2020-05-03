import { Profile } from "../domain/profile";
import { Player } from "../domain/player";

export class Fixture {
    static imageUrl = "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_200x200.jpg";
    static profilename = "Donald J. Trump";
    static verified = true;
    static username = "realDonaldTrump"
    static lobbyId = "QNYDKA";
    static player: Player = new Player();
    static profile = () => new Profile(
        Fixture.imageUrl,
        Fixture.profilename,
        Fixture.verified,
        Fixture.username);

    static undefined: any;
}