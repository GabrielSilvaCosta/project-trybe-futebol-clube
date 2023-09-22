// TeamModel.ts

import SequelizeTeam from '../database/models/SequelizeModel';
import ITeam from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    const allTeamsData = await this.model.findAll();
    return allTeamsData;
  }
}

export default new TeamModel();
