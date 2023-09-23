import * as sinon from "sinon";
import * as chai from "chai";
//@ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import SequelizeTeam from "../database/models/SequelizeModel";
import { teamsMock, teamMock, teamCruzeiroMock } from "./mocks/teams.mock";

chai.use(chaiHttp);

const { expect } = chai;

describe("Server Integration Tests", () => {
  it("should return a 200 status when testing if everything is OK", async () => {
    const { status } = await chai.request(app).get("/");
    expect(status).to.equal(200);
    //
  });
});

describe("TEAMS Endpoint Tests", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should return all teams successfully with a 200 status", async () => {
    sinon.stub(SequelizeTeam, "findAll").resolves(teamsMock as any);
    const httpResponse = await chai.request(app).get("/teams");
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsMock);
  });

  it("should return a specific team successfully with a 200 status", async () => {
    sinon.stub(SequelizeTeam, "findByPk").resolves(teamMock as any);
    const httpResponse = await chai.request(app).get("/teams/2");
    const { status, body } = httpResponse;
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamMock);
  });

  
});
