import { Request, Response } from 'express';
import UsersService from '../services/users.service';

class UsersController {
  constructor(private userService = new UsersService()) {
  }

  public login = async (req: Request, res: Response) => {
    const response = this.userService.userLogin(req.body);
    return res.status(200).json((await response).data);
  };
}

export default UsersController;
