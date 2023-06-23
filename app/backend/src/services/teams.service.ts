import TeamsModel from '../models/teams.model';
import IteamService from '../Interfaces/IteamService';
import { ServiceResponse } from '../database/types/ServiceResponse';
import Iteams from '../Interfaces/Iteams';

class TeamsService implements IteamService {
  // private model: IteamModel

  // constructor(model: IteamModel) {
  //   this.model = new TeamsModel
  // }

  constructor(private model = new TeamsModel()) {
  }

  public findAllTeams = async (): Promise<ServiceResponse<Iteams[]>> => {
    const allTeams = await this.model.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  };

  public findTeamById = async (id: number): Promise<ServiceResponse<Iteams>> => {
    const teams = await this.model.findById(id);
    if (!teams) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: teams };
  };
}

export default TeamsService;
