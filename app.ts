import express = require("express");
import { Tweet } from "./domain/tweet";
import { Fixture } from "./test/fixture";
import { Config } from "./test/web/web.config";
export const app: express.Application = express();

app.get(Config.baseUrlTweet,  (req, res) => {
    res.send(new Tweet(Fixture.profile(), "Tom Tiffany (@TomTiffanyWI) is a " + 
    " Great Advocate for the incredible people of Wisconsin (WI07). We need" +
    " Tom in Congress to help us Make America Great Again! He will Fight for Small" + 
    " Business, supports our Incredible Farmers," +
    " Loves our Military and our Vets...."));
});

app.post(Config.baseUrlLobby, (req, res) => {
    res
        .status(201)
        .send({lobby: {id: undefined}});
});

const port: Number = Math.floor(Math.random() * 1000);
app.listen(port,  () => {
    console.log(`Visit your site here: http://localhost:${port}`);
});