import express = require("express");
import { Tweet } from "./domain/tweet";
import { Profile } from "./domain/profile";
import { Fixture } from "./spec/fixture";
export const app: express.Application = express();

app.get("/",  (req, res) => {
    res.send(new Tweet(Fixture.profile()));
});

const port = 9000;
app.listen(port,  () => {
    console.log(`Visit your site here: http://localhost:${port}`);
});