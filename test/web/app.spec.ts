import { app } from "../../app";
import chai = require('chai');
import chaiHttp = require('chai-http');
import { expect } from "chai";
import { Config } from "./web.config";
chai.use(chaiHttp);

describe("app", () => {
    it(`${Config.baseUrlTweet} should respond with 200 OK`, (done) => {
        chai
          .request(app)
          .get(Config.baseUrlTweet)
          .end((err, res) => {
            expect(res.status).equal(200);
            done();
          })
    });
});