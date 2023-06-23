import IuserModel from '../Interfaces/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';
import Iuser from '../Interfaces/IUser';

class UsersModel implements IuserModel {
  private model = SequelizeUser;

  findByEmail = async (email: Iuser['email']): Promise<Iuser | null> => {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  };
}

export default UsersModel;
