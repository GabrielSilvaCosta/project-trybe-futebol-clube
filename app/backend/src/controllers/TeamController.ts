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

  public static async getTeamById(this: void, req: Request, res: Response) {
    const { id } = req.params;

    try {
      const team = await TeamService.getTeamById(Number(id));

      if (!team) {
        return res.status(404).json({ message: 'Time não encontrado' });
      }

      return res.status(200).json(team);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export default TeamController;
