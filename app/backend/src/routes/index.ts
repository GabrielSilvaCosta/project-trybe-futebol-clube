import { Router } from 'express';
import TeamRoutes from './TeamRoutes';
import UserRouter from './UserRoutes';

const router = Router();

// Conecte as rotas do time ao módulo de rotas principal
router.use('/teams', TeamRoutes);
router.use('/login', UserRouter);

export default router;
