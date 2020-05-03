import { Profile } from "../domain/profile";
import { Player } from "../domain/player";
import { Lobby } from "../domain/lobby";

export class Fixture {
    static imageUrl = "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_200x200.jpg";
    static profilename = "Donald J. Trump";
    static verified = true;
    static profileName = "realDonaldTrump"
    static lobbyId = "QNYDKA";
    static username = "WiseAnt";
    static player = () => new Player("WiseAnt");
    static profile = () => new Profile(
        Fixture.imageUrl,
        Fixture.profilename,
        Fixture.verified,
        Fixture.profileName);
    
    static lobbby = () => new Lobby(Fixture.lobbyId, Fixture.player());
    
    static undefined: any;
}