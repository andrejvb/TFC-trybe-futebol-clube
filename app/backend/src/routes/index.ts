import { Router } from 'express';
import teamsRoutes from './teams.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/teams', teamsRoutes);

router.use('/login', usersRoutes);

export default router;
