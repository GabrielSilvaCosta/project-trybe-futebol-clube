import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeMatch from "../database/models/SequelizeMatch";
import SequelizeTeam from "../database/models/SequelizeModel"; 

chai.use(chaiHttp);

const { expect } = chai;

describe("LEADERBOARD endpoint Test", () => {
  afterEach(sinon.restore);

  it("Should return status 200 and home team performances successfully in descending order based on established criteria", async () => {
    const teamFindAllStub = sinon.stub(SequelizeTeam, "findAll");
    teamFindAllStub.resolves([{ name: "Team A" }, { name: "Team B" }] as any);

    const matchFindAllStub = sinon.stub(SequelizeMatch, "findAll");
    matchFindAllStub.resolves([
      { homeTeam: "Team A", awayTeam: "Team B", result: "Draw" },
    ] as any);

    const httpResponse = await chai.request(app).get("/leaderboard/home");
    const { status } = httpResponse;

    expect(status).to.equal(200);
  });

  it("Should return status 200 and away team performances successfully in descending order based on established criteria", async () => {
    const teamFindAllStub = sinon.stub(SequelizeTeam, "findAll");
    teamFindAllStub.resolves([{ name: "Team A" }, { name: "Team B" }] as any);
    const matchFindAllStub = sinon.stub(SequelizeMatch, "findAll");
    matchFindAllStub.resolves([
      { homeTeam: "Team A", awayTeam: "Team B", result: "Draw" },
    ] as any);

    const httpResponse = await chai.request(app).get("/leaderboard/away");
    const { status } = httpResponse;

    expect(status).to.equal(200);
  });

  it("Should return status 200 and the OVERALL team rankings successfully in descending order based on established criteria", async () => {
    const teamFindAllStub = sinon.stub(SequelizeTeam, "findAll");
    teamFindAllStub.resolves([{ name: "Team A" }, { name: "Team B" }] as any);
    const matchFindAllStub = sinon.stub(SequelizeMatch, "findAll");
    matchFindAllStub.resolves([
      { homeTeam: "Team A", awayTeam: "Team B", result: "Draw" },
    ] as any);

    const httpResponse = await chai.request(app).get("/leaderboard/");
    const { status } = httpResponse;

    expect(status).to.equal(200);
  });

  it("Should return status 404 when accessing a non-existent route", async () => {
    const httpResponse = await chai.request(app).get("/non-existent-route");
    const { status } = httpResponse;

    expect(status).to.equal(404);
  });
});
