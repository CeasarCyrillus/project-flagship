import express = require("express");
import { Tweet } from "./domain/tweet";
import { Fixture } from "./test/fixture";
import { Config } from "./test/web/web.config";
import { Lobby } from "./domain/lobby.entity";
import { Player } from "./domain/player";
import "reflect-metadata";
import { createConnection } from "typeorm";

export const app = express();

app.use(express.json());
app.use(express.urlencoded());

export const db = { lobbies: new Array<Lobby>() };

createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ceasarcyrillus",
    password: "admin",
    database: "ceasarcyrillus",
    entities: [
        Lobby
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));

// Get tweet
app.get(Config.baseUrlTweet,  (req, res) => {
    res
    .status(200)
    .send(new Tweet(Fixture.profile(), "Tom Tiffany (@TomTiffanyWI) is a " + 
    " Great Advocate for the incredible people of Wisconsin (WI07). We need" +
    " Tom in Congress to help us Make America Great Again! He will Fight for Small" + 
    " Business, supports our Incredible Farmers," +
    " Loves our Military and our Vets...."));
});

// Create Lobby
app.post(Config.baseUrlLobby, (req, res) => {
    const owner = new Player(req.body.owner.username);
    const lobby = new Lobby(req.body.id, owner, req.body.description);
    db.lobbies.push(lobby);
    
    res
        .status(201)
        .send(lobby);
});

// Join Lobby
app.patch(`${Config.baseUrlLobby}/:lobbyId`, (req, res) => {
    const lobbyIndex = db.lobbies.findIndex(lobby => lobby.id === req.params.lobbyId);
    if(lobbyIndex === -1){
        res.status(404);
        res.send();
    }
    else{
        const player = new Player(req.body.player.username);
        const lobby = db.lobbies[lobbyIndex];
        res.send(lobby);
    }
});

const server = app.listen(0, () => {
    // @ts-ignore todo: fix this
    console.log('Listening', server.address()?.port)
});