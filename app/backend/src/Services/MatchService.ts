import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import IMatch, { IMatchInput } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { NewEntity } from '../Interfaces';

export default class MatchService {
  private readonly matchModel: IMatchModel;
  private readonly teamModel: typeof TeamModel;

  constructor(matchModel: IMatchModel = new MatchModel(), teamModel: typeof TeamModel = TeamModel) {
    this.matchModel = matchModel;
    this.teamModel = teamModel;
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

  public async updateMatch(matchId: number, matchInput: IMatchInput): Promise<void> {
    try {
      await this.matchModel.updateMatchById(matchId, matchInput);
    } catch (error) {
      throw new Error('Erro ao atualizar a partida.');
    }
  }

  public async createMatch(newMatch: NewEntity<IMatch>):
  Promise<ServiceResponse<IMatch | ServiceMessage>> {
    const { homeTeamId, awayTeamId } = newMatch;

    if (homeTeamId === awayTeamId) {
      return { status: 'UNPROCESSABLE',
        data:
      { message: 'It is not possible to create a match with two equal teams' } };
    }

    const [homeTeam, awayTeam] = await Promise.all([this.teamModel.findById(homeTeamId),
      this.teamModel.findById(awayTeamId)]);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const matchCreated = await this.matchModel.create(newMatch);

    return { status: 'CREATED', data: matchCreated };
  }
}
