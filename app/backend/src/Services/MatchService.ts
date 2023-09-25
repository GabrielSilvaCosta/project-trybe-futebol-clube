import MatchModel from '../models/MatchModel';
import IMatch from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  private readonly matchModel: IMatchModel;

  constructor(matchModel: IMatchModel = new MatchModel()) {
    this.matchModel = matchModel;
  }

  public async getAllMatches(isInProgressFilter?: string): Promise<ServiceResponse<IMatch[]>> {
    try {
      let matches: IMatch[];

      if (isInProgressFilter === 'true') {
        matches = await this.matchModel.findMatchesByProgress(true);
      } else if (isInProgressFilter === 'false') {
        matches = await this.matchModel.findMatchesByProgress(false);
      } else {
        matches = await this.matchModel.findAllMatches();
      }

      return { status: 'SUCCESSFUL', data: matches };
    } catch (error) {
      throw new Error('Erro ao buscar partidas.');
    }
  }

  public async finishMatch(matchId: number): Promise<void> {
    try {
      await this.matchModel.finishMatchById(matchId);
    } catch (error) {
      throw new Error('Erro ao finalizar a partida.');
    }
  }
}
