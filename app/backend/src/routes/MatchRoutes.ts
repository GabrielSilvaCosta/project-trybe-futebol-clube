import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../Services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

export default router;
