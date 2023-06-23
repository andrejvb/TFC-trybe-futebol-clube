import * as bcrypt from 'bcryptjs';
import IuserService from '../Interfaces/IUserService';
import UsersModel from '../models/users.model';
import { Token } from '../database/types/Token';
import { ServiceMessage, ServiceResponse } from '../database/types/ServiceResponse';
import Iuser, { IuserLogin } from '../Interfaces/IUser';
import JWT from '../utils/JWT';

class UsersService implements IuserService {
  constructor(
    private model = new UsersModel(),
    private jwt = JWT,
  ) { }

  public userLogin = async (credentials: IuserLogin)
  : Promise<ServiceResponse<ServiceMessage | Token>> => {
    const user = await this.model.findByEmail(credentials.email);
    if (user) {
      if (!bcrypt.compareSync(credentials.password, user.password)) {
        return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
      }
      const { email, role } = user as Iuser;
      const token = this.jwt.sign({ email, role });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
  };
}

export default UsersService;
