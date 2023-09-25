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
}
