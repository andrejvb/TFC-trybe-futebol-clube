import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/JWT';

class LoginValidation {
  static fieldsValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void => {
    const { email, password } = req.body;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  static tokenValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <Response | void> => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    const validation = jwt.verify(token);
    if (validation === 'Token must be a valid token') {
      return res.status(401).json({ message: validation });
    }
    res.locals.user = validation;
    next();
  };

  static userValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password', 'userName', 'role'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }
    next();
  }
}

export default LoginValidation;
