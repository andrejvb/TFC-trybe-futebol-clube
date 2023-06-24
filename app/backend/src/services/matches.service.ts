import IMatchs from '../Interfaces/IMatches';
import { ServiceResponse } from '../database/types/ServiceResponse';
import IMatchModel from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/matches.model';

class MatchesService {
  constructor(private matchModel: IMatchModel = new MatchesModel()) {
  }

  public findAllMatches = async (): Promise<ServiceResponse<IMatchs[]>> => {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  };

  public findMatchStatus = (boll: boolean) => {
    const matches = this.matchModel.findMatchInProgress(boll);
    return { status: 'SUCCESSFUL', data: matches };
  };
}

export default MatchesService;
