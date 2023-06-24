import IMatches from './IMatches';

export default interface IMatchModel {
  findAll(): Promise<[] | IMatches[]>;
  findMatchInProgress(boll: boolean): Promise<IMatches[]>
}
