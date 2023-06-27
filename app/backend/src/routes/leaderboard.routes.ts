import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get('/', leaderBoardController.getLeaderBoardHome);

export default router;
