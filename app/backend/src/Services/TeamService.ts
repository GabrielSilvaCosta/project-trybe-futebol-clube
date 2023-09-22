// TeamService.ts

import TeamModel from '../models/TeamModel';

class TeamService {
  public static async getAllTeams() {
    const teams = await TeamModel.findAll();
    return teams;
  }

  public static async getTeamById(id: number) {
    return TeamModel.findById(id);
  }
}

export default TeamService;
