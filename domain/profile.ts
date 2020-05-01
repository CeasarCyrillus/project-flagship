export class Profile {
    imageUrl: string;
    name: string;
    verified: boolean;
    username: string;

    constructor(
        imageUrl: string,
        name: string,
        verified: boolean,
        username: string) {
            this.imageUrl = imageUrl;
            this.name = name;
            this.verified = verified;
            this.username = `@${username}`
    }
}