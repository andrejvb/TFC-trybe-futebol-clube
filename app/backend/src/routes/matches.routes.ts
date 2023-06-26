import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import middlewares from '../middlewares/loginValidation';

const router = Router();

const matchController = new MatchesController();

router.get('/', matchController.findAllMatches);

router.patch('/:id/finish', middlewares.tokenValidation, matchController.finishMath);

export default router;