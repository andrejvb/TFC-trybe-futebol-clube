import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import middlewares from '../middlewares/loginValidation';

const router = Router();

const userController = new UsersController();

router.post('/', middlewares.fieldsValidation, userController.login);

export default router;
