import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

const teamController = new TeamsController();

router.get('/', teamController.findAllTeams);

router.get('/:id', teamController.findTeamById);

export default router;
