import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchController = new MatchesController();

router.get('/', matchController.findAllMatches);

export default router;
