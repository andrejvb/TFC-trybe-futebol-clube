import IMatches from './IMatches';

export default interface IMatchModel {
  findAll(): Promise<[] | IMatches[]>;
  findMatchInProgress(inProgress: boolean): Promise<IMatches[]>
}
