import Iuser from './Iuser';

export default interface IuserModel {
  findByEmail(email: Iuser['email']): Promise<Iuser | null>
}
