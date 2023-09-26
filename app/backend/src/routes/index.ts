import { Router } from 'express';
import TeamRoutes from './TeamRoutes';
import UserRouter from './UserRoutes';
import MatchRouter from './MatchRoutes';
import LeaderBoardRouter from './LeaderBoardRoutes';

const router = Router();

// Conecte as rotas do time ao módulo de rotas principal
router.use('/teams', TeamRoutes);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', LeaderBoardRouter);

export default router;
