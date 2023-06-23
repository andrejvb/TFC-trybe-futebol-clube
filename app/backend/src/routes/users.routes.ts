import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import middlewares from '../middlewares/loginValidation';

const router = Router();

const userController = new UsersController();

router.post(
  '/',
  middlewares.fieldsValidation,
  userController.login,
);

router.get(
  '/role',
  middlewares.tokenValidation,
  userController.returnRole,
);

export default router;
