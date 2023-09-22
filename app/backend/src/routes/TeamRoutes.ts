// TeamRoutes.ts

import { Router } from 'express';
import TeamController from '../controllers/TeamController';

// const teamController = new TeamController();

const router = Router();

// Rota GET para obter todos os times
router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getTeamById);

export default router;
