import { ServiceMessage } from '../database/types/ServiceResponse';
import IMatches from './IMatches';

export default interface IMatchModel {
  findAll(): Promise<[] | IMatches[]>;
  findMatchInProgress(inProgress: boolean): Promise<IMatches[]>
  finishMath(id: number): Promise<ServiceMessage>
}