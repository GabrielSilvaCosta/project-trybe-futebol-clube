import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { app } from "../app";
import MatchController from "../controllers/MatchController";
import MatchService from "../Services/MatchService";
import { Request, Response } from "express";

chai.use(chaiHttp);
const { expect } = chai;

describe("MatchController", () => {
  let matchController: MatchController;
  let matchServiceStub: sinon.SinonStub;

  beforeEach(() => {
    matchServiceStub = sinon.stub(MatchService.prototype, "getAllMatches");
    matchController = new MatchController(new MatchService());
  });

  afterEach(() => {
    sinon.restore();
  });

  it("deve retornar todas as partidas", async () => {
    matchServiceStub.callsFake(async () => {
      return { status: "SUCCESSFUL", data: [{ id: 1, name: "Match 1" }] };
    });

    const req: Request = {
      query: { inProgress: "" },
    } as unknown as Request;

    const res: Response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await matchController.getAllMatches(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;

    expect(
      (res.json as sinon.SinonStub).calledWith([{ id: 1, name: "Match 1" }])
    ).to.be.true;
  });

  it("deve lidar com erros", async () => {
    matchServiceStub.callsFake(async () => {
      throw new Error("Erro simulado");
    });

    const req: Request = {
      query: { inProgress: "" },
    } as unknown as Request;

    const res: Response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await matchController.getAllMatches(req, res);

    expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;

    expect(
      (res.json as sinon.SinonStub).calledWith({
        error: "Internal Server Error",
      })
    ).to.be.true;
  });

  it("deve lidar com erros ao retornar todas as partidas", async () => {
    matchServiceStub.callsFake(async () => {
      throw new Error("Erro simulado");
    });

    const req: Request = {
      query: { inProgress: "" },
    } as unknown as Request;

    const res: Response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await matchController.getAllMatches(req, res);

    expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;

    expect(
      (res.json as sinon.SinonStub).calledWith({
        error: "Internal Server Error",
      })
    ).to.be.true;
  });

  it("deve lidar com erros ao finalizar uma partida", async () => {
    const matchId = 1;
    sinon
      .stub(MatchService.prototype, "finishMatch")
      .throws(new Error("Erro simulado"));
    const res: Response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await matchController.finishMatch({ params: { id: matchId } } as any, res);

    expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;

    expect(
      (res.json as sinon.SinonStub).calledWith({
        error: "Internal Server Error",
      })
    ).to.be.true;
  });

  it("deve lidar com erros ao atualizar uma partida", async () => {
    const matchId = 1;
    sinon
      .stub(MatchService.prototype, "updateMatch")
      .throws(new Error("Erro simulado"));
    const res: Response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;

    await matchController.updateMatch(
      {
        params: { id: matchId },
        body: { homeTeamGoals: 2, awayTeamGoals: 1 },
      } as any,
      res
    );

    expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;

    expect(
      (res.json as sinon.SinonStub).calledWith({
        error: "Internal Server Error Updated",
      })
    ).to.be.true;
  });

  
});
