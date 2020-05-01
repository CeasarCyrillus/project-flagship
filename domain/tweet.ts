import { Profile } from "./profile";

export class Tweet {
    readonly profile: Profile;
    readonly text: string;
    constructor(profile: Profile, text: string) {
        this.profile = profile;
        if(text.length >= 280) throw new Error("Tweet text must be 280 character or less");
        this.text = text;
    }
}