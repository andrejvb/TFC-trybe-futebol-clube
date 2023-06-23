import { Request, Response } from 'express';
import UsersService from '../services/users.service';

class UsersController {
  constructor(private userService = new UsersService()) {
  }

  public login = async (req: Request, res: Response) => {
    const { status, data } = await this.userService.userLogin(req.body);
    if (status === 'UNAUTHORIZED') return res.status(401).json(data);
    return res.status(200).json(data);
  };

  public returnRole = async (req: Request, res: Response) => {
    const role = res.locals.user;
    return res.status(200).json(role);
  };
}

export default UsersController;
