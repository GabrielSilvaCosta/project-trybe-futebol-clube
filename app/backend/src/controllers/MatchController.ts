import { Request, Response } from 'express';
import MatchService from '../Services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private readonly matchService: MatchService) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    try {
      const { inProgress } = req.query;
      const { status, data } = await this.matchService.getAllMatches(inProgress as string);
      return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    try {
      const matchId = parseInt(req.params.id, 10);

      await this.matchService.finishMatch(matchId);

      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    try {
      const matchId = parseInt(req.params.id, 10);

      const { homeTeamGoals, awayTeamGoals } = req.body;

      await this.matchService.updateMatch(matchId, { homeTeamGoals, awayTeamGoals });

      return res.status(200).json({ message: 'Updated' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error Updated' });
    }
  }
}
