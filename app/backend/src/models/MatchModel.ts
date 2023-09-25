import IMatch, { IMatchInput } from '../Interfaces/matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeModel';
import { NewEntity } from '../Interfaces';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  // Encontra todas as partidas
  public async findAllMatches(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  // Encontra partidas com base no progresso (em andamento ou não)
  public async findMatchesByProgress(query: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress: query },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  // Finaliza uma partida com base no ID
  public async finishMatchById(id: IMatch['id']): Promise<void> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  // Atualiza uma partida com base no ID e nos gols das equipes
  public async updateMatchById(matchId: IMatch['id'], matchInput: IMatchInput): Promise<void> {
    await this.model.update(
      { homeTeamGoals: matchInput.homeTeamGoals, awayTeamGoals: matchInput.awayTeamGoals },
      { where: { id: matchId } },
    );
  }

  // Cria uma nova partida
  public async create(newMatch: NewEntity<IMatch>): Promise<IMatch> {
    const matchCreated = await this.model.create({ ...newMatch, inProgress: true });
    return matchCreated;
  }
}
