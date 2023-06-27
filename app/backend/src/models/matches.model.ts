import IMatches, { matchValues } from '../Interfaces/IMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatchModel from '../Interfaces/IMatchesModel';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ServiceMessage } from '../database/types/ServiceResponse';

class MatchesModel implements IMatchModel {
  model = SequelizeMatch;

  findAll = async (): Promise<[] | IMatches[]> => {
    const allMatches = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  };

  findMatchInProgress = async (inProgress: boolean): Promise<IMatches[]> => {
    const matches = await this.model.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  finishMath = async (id: number): Promise<ServiceMessage> => {
    await this.model.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  };

  updateMatch = async (
    id: number,
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ):
  Promise<ServiceMessage> => {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return { message: 'Update finished' };
  };

  createMatch = async (params: matchValues): Promise<IMatches> => {
    const newMatch = await this.model.create({ ...params, inProgress: true });
    return newMatch.dataValues;
  };
}

export default MatchesModel;
