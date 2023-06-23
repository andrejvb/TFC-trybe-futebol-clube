import { ServiceMessage, ServiceResponse } from '../database/types/ServiceResponse';
import { Token } from '../database/types/Token';
import { IuserLogin } from './Iuser';

export default interface IuserService {
  userLogin(credentials: IuserLogin): Promise<ServiceResponse< ServiceMessage | Token>>
}
