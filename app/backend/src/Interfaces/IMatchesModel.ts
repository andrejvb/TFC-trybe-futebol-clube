import IMatchs from './IMatches';

export default interface IMatchModel {
  findAll(): Promise<IMatchs[]>;
}
