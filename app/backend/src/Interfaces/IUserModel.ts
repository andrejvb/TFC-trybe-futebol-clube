import Iuser from './IUser';

export default interface IuserModel {
  findByEmail(email: Iuser['email']): Promise<Iuser | null>
}
