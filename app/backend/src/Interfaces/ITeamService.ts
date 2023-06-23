import Iteams from './ITeams';
import { ServiceResponse } from '../database/types/ServiceResponse';

export default interface IteamService {
  findAllTeams(): Promise<ServiceResponse<Iteams[]>>
}
