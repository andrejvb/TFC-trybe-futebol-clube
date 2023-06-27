import { Router } from 'express';
import teamsRoutes from './teams.routes';
import usersRoutes from './users.routes';
import matchesRoutes from './matches.routes';
import leaderBoard from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRoutes);

router.use('/login', usersRoutes);

router.use('/matches', matchesRoutes);

router.use('/leaderboard/home', leaderBoard);

export default router;
