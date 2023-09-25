import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import MatchService from "../Services/MatchService";
// import { ServiceResponse } from "../Interfaces/ServiceResponse";
import MatchModel from "../models/MatchModel";
import IMatch from "../Interfaces/matches/IMatch";

chai.use(chaiHttp);
const { expect } = chai;


describe("MatchService", () => {
  let matchService: MatchService;
  let matchModelStub: sinon.SinonStubbedInstance<MatchModel>;

  beforeEach(() => {
    matchModelStub = sinon.createStubInstance(MatchModel);
    matchService = new MatchService(matchModelStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("deve finalizar uma partida", async () => {
    const matchId = 1;
    await matchService.finishMatch(matchId);
    expect(matchModelStub.finishMatchById.calledWith(matchId)).to.be.true;
  });

  it("deve atualizar uma partida", async () => {
    const matchId = 1;
    const matchInput = { homeTeamGoals: 2, awayTeamGoals: 1 };
    await matchService.updateMatch(matchId, matchInput);
    expect(matchModelStub.updateMatchById.calledWith(matchId, matchInput)).to.be.true;
  });

  it("deve lidar com erros ao retornar todas as partidas", async () => {
    matchModelStub.findMatchesByProgress.throws(new Error("Erro simulado"));

    try {
      await matchService.getAllMatches("true");
    } catch (error: any) {
      expect(error.message).to.equal("Erro ao buscar partidas.");
    }
  });

  it("deve lidar com erros ao finalizar uma partida", async () => {
    const matchId = 1;
    matchModelStub.finishMatchById.throws(new Error("Erro simulado"));

    try {
      await matchService.finishMatch(matchId);
    } catch (error: any) {
      expect(error.message).to.equal("Erro ao finalizar a partida.");
    }
  });

  it("deve lidar com erros ao atualizar uma partida", async () => {
    const matchId = 1;
    const matchInput = { homeTeamGoals: 2, awayTeamGoals: 1 };
    matchModelStub.updateMatchById.throws(new Error("Erro simulado"));

    try {
      await matchService.updateMatch(matchId, matchInput);
    } catch (error: any) {
      expect(error.message).to.equal("Erro ao atualizar a partida.");
    }
  });

  it('deve retornar todas as partidas em andamento', async () => {
    // Crie um mock de dados com a propriedade 'id'
    const matches: IMatch[] = [
      {
        id: 1,
        homeTeamId: 1,
        homeTeamGoals: 0,
        awayTeamId: 2,
        awayTeamGoals: 0,
        inProgress: true,
      },
    ];
  
    // Configure o stub para retornar o mock de dados
    matchModelStub.findMatchesByProgress.resolves(matches);
  
    const result = await matchService.getAllMatches('true');
  
    expect(result).to.deep.equal({ status: 'SUCCESSFUL', data: matches });
  });
  
  

});
