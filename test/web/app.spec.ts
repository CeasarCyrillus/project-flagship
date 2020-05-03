import { app } from "../../app";
import { chai }from "../setup-tests"
import { Config } from "./web.config";
import { expect } from "chai";
import { Fixture } from "../fixture";

describe("App", () => {
    it(`GET ${Config.baseUrlTweet} should respond with tweet`, (done) => {
        chai
          .request(app)
          .get(Config.baseUrlTweet)
          .end((err, res) => {
            expect(res.status).equal(200);
            done();
          })
    });

    describe(`${Config.baseUrlLobby}`, () => {
      it(`PATCH should respond with 404 NOT FOUND`, (done) => {
        chai
          .request(app)
          .patch(`${Config.baseUrlLobby}/NOTFOUND`)
          .end((err, res) => {
            expect(res.status).equal(404);
            done();
          })
      });

      it(`POST should respond with lobby`, (done) => {
        chai
          .request(app)
          .post(Config.baseUrlLobby)
          .type("application/x-www-form-urlencoded")
          .send({
            owner: {username: Fixture.username}
          })
          .end((err, res) => {
            expect(res.status).to.be.equal(201);
            expect(res.body.id).not.to.be.undefined;
            expect(res.body.description).not.to.be.undefined;
            expect(res.body.owner).not.to.be.undefined;
            done();
          })
      });
    })
});