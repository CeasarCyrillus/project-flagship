import { Profile } from "./profile";

export class Tweet {
    profile: Profile;
    text: string;
    constructor(profile: Profile, text: string) {
        this.profile = profile;
        this.text = text;
    }
}