// TeamService.ts

import TeamModel from '../models/TeamModel';

class TeamService {
  public static async getAllTeams() {
    const teams = await TeamModel.findAll();
    return teams;
  }
}

export default TeamService;
