import { Router } from 'express';
import teamsRoute from './teams.routes';

const router = Router();

router.use('/teams', teamsRoute);

export default router;
