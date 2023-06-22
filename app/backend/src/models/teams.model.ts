import IteamModel from '../Interfaces/IteamModel';
import Iteams from '../Interfaces/Iteams';
import SequelizeTeam from '../database/models/SequelizeTeam';

class TeamsModel implements IteamModel {
  private model = SequelizeTeam;

  public findAll = async (): Promise<Iteams[]> => {
    const dbTeams = await this.model.findAll();
    const teams = dbTeams.map((t) => t.dataValues);
    return teams;
  };

  public findById = async (id: Iteams['id']): Promise<Iteams | null> => {
    const dbTeams = await this.model.findByPk(id);
    if (dbTeams == null) return null;
    const { teamName }: Iteams = dbTeams;
    return { id, teamName };
  };
}

export default TeamsModel;
