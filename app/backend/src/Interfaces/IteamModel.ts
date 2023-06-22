import Iteams from './Iteams';

export default interface IteamModel {
  findAll(): Promise<Iteams[]>
}
