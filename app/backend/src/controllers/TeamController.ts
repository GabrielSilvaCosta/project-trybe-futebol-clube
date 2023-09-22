// TeamController.ts

import { Request, Response } from 'express';
import TeamService from '../Services/TeamService';

class TeamController {
  public static async getAllTeams(req: Request, res: Response) {
    try {
      const teams = await TeamService.getAllTeams();
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default TeamController;
