import express = require("express");
import { Tweet } from "./domain/tweet";
import { Profile } from "./domain/profile";
import { Fixture } from "./spec/fixture";
export const app: express.Application = express();

app.get("/",  (req, res) => {
    res.send(new Tweet(Fixture.profile(), "Tom Tiffany (@TomTiffanyWI) is a " + 
    " Great Advocate for the incredible people of Wisconsin (WI07). We need" +
    " Tom in Congress to help us Make America Great Again! He will Fight for Small" + 
    " Business, supports our Incredible Farmers," +
    " Loves our Military and our Vets...."));

});

const port = 9000;
app.listen(port,  () => {
    console.log(`Visit your site here: http://localhost:${port}`);
});