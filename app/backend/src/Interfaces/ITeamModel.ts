import Iteams from './ITeams';

export default interface IteamModel {
  findAll(): Promise<Iteams[]>
}
