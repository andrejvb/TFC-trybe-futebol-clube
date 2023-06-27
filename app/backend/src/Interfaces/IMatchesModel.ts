import { ServiceMessage } from '../database/types/ServiceResponse';
import IMatches, { matchValues } from './IMatches';

export default interface IMatchModel {
  findAll(): Promise<[] | IMatches[]>;
  findMatchInProgress(inProgress: boolean): Promise<IMatches[]>
  finishMath(id: number): Promise<ServiceMessage>
  updateMatch(
    id: number,
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ):
  Promise<ServiceMessage>
  createMatch (params: matchValues): Promise<IMatches>
  isExistsTeam (id: number): Promise<boolean>
}
