import Iteams from './Iteams';
import { ServiceResponse } from './ServiceResponse';

export default interface IteamService {
  findAllTeams(): Promise<ServiceResponse<Iteams[]>>
}
