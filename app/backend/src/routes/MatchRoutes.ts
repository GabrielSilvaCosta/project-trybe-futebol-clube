import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import MatchController from '../controllers/MatchController';
import MatchService from '../Services/MatchService';

const matchService = new MatchService();
const matchController = new MatchController(matchService);

const router = Router();

router.get('/', (req: Request, res: Response) =>
  matchController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
