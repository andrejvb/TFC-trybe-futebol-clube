import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get('/home', leaderBoardController.getLeaderBoardHome);

router.get('/away', leaderBoardController.getLeaderBoardAway);

export default router;
