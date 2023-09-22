import { Router } from 'express';
import TeamRoutes from './TeamRoutes';

const router = Router();

// Conecte as rotas do time ao módulo de rotas principal
router.use('/teams', TeamRoutes);

export default router;
