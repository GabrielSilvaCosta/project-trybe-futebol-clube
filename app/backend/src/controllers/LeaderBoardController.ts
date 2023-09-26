import { Request, Response } from 'express';
import LeaderBoardService from '../Services/LeaderBoardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  private readonly leaderBoardService: LeaderBoardService;

  constructor(leaderBoardService?: LeaderBoardService) {
    this.leaderBoardService = leaderBoardService || new LeaderBoardService();
  }

  public async getPerformanceTeamsHome(req: Request, res: Response): Promise<void> {
    try {
      const serviceResponse = await this.leaderBoardService.getPerformanceTeamsHome();
      const { status, data } = serviceResponse;
      res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      console.error('Error in getPerformanceTeamsHome:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getPerformanceTeamsAway(req: Request, res: Response): Promise<void> {
    try {
      const serviceResponse = await this.leaderBoardService.getPerformanceTeamsAway();
      const { status, data } = serviceResponse;
      res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
      console.error('Error in getPerformanceTeamsAway:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
