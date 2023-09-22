// TeamRoutes.ts

import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

// Rota GET para obter todos os times
router.get('/', TeamController.getAllTeams);

export default router;
