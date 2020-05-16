import "reflect-metadata";
import express = require("express");
import { Config } from "./test/web/web.config";
import { Lobby } from "./domain/lobby";
import { Player } from "./domain/player";
import { getDatabaseConnection, connectDatabase } from "./service/service";

export const app = express();

app.use(express.json());
app.use(express.urlencoded());

const config = getDatabaseConnection(app.settings.env);
const database = connectDatabase(config);

// Create Lobby
app.post(Config.baseUrlLobby, async (req, res) => {
    const service = await database;
    const lobby = new Lobby(req.body.code, req.body.description);
    lobby.owner = new Player(req.body.owner.username);
    await service.lobbyRepository.add(lobby);
    return res.status(201).send(lobby);  
});

// Join Lobby
app.patch(`${Config.baseUrlLobby}/:lobbyCode`, async (req, res) => {
    const service = await database;
    const lobby = await service.lobbyRepository.getByCode(req.params.lobbyCode);

    if(lobby === undefined) return res.status(404).send();
    
    const player = new Player(req.body.player.username);
    lobby.addPlayer(player);
    await service.lobbyRepository.update(lobby);
    return res.send(lobby);
});

const server = app.listen(0, () => {
    // @ts-ignore todo: fix this
    console.log('Listening', server.address()?.port)
});