import { app } from "../../app";
import chai = require('chai');
import chaiHttp = require('chai-http');
import { expect } from "chai";
import { Config } from "./web.config";
chai.use(chaiHttp);

describe("app", () => {
    it(`GET ${Config.baseUrlTweet} should respond with 200 OK`, (done) => {
        chai
          .request(app)
          .get(Config.baseUrlTweet)
          .end((err, res) => {
            expect(res.status).equal(200);
            done();
          })
    });

    describe(`${Config.baseUrlLobby}`, () => {
      it(`GET should respond with 404 NOT FOUND`, (done) => {
        chai
          .request(app)
          .get(Config.baseUrlLobby)
          .end((err, res) => {
            expect(res.status).equal(404);
            done();
          })
      });

      it(`POST should respond with lobby`, (done) => {
        chai
          .request(app)
          .post(Config.baseUrlLobby)
          .end((err, res) => {
            expect(res.status).equal(201);
            expect(res.body.lobby.id).to.not.be.undefined;
            done();
          })
      });
    })
});