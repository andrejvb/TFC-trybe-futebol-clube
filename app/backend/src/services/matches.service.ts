import IMatches, { matchValues } from '../Interfaces/IMatches';
import { ServiceMessage, ServiceResponse } from '../database/types/ServiceResponse';
import IMatchModel from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/matches.model';

class MatchesService {
  constructor(private matchModel: IMatchModel = new MatchesModel()) {
  }

  public findAllMatches = async (): Promise<ServiceResponse<IMatches[]>> => {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  };

  public findMatchStatus = async (inProgress: boolean) => {
    const matches = await this.matchModel.findMatchInProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  };

  public finishMath = async (id:number): Promise<ServiceResponse<ServiceMessage>> => {
    const result = await this.matchModel.finishMath(id);
    return { status: 'SUCCESSFUL', data: result };
  };

  public updateMatch = async (
    id: number,
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  )
  :Promise<ServiceResponse<ServiceMessage>> => {
    const result = await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: result };
  };

  createMatch = async (
    params: matchValues,
  ): Promise<ServiceResponse<IMatches | ServiceMessage>> => {
    const homeTeamExist = await this.matchModel.isExistsTeam(params.homeTeamId);
    const awayTeamExist = await this.matchModel.isExistsTeam(params.awayTeamId);
    if (!homeTeamExist || !awayTeamExist) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.createMatch(params);
    return { status: 'SUCCESSFUL', data: newMatch };
  };
}

export default MatchesService;
