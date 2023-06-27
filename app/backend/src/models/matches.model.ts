import { ServiceMessage } from '../database/types/ServiceResponse';
import IMatches, { matchValues } from '../Interfaces/IMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatchModel from '../Interfaces/IMatchesModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

class MatchesModel implements IMatchModel {
  model = SequelizeMatch;
  modelTeam = SequelizeMatch;

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

  isExistsTeam = async (id: number): Promise<boolean> => {
    const isTeamExists = await this.modelTeam.findByPk(id);
    return !!isTeamExists;
  };

  createMatch = async (
    params: matchValues,
  ): Promise<IMatches> => {
    // const isMatchInProgress = await this.model.findOne({
    //   where: {
    //     homeTeamId: params.homeTeamId,
    //     awayTeamId: params.awayTeamId,
    //     inProgress: true,
    //   },
    // });
    // if (isMatchInProgress) {
    //   return {
    //     status: 'CONFLICT',
    //     data: { message: 'It is not possible to create a match with two equal teams' },
    //   };
    // }
    const newMatch = await this.model.create({ ...params, inProgress: true });
    return newMatch.dataValues;
  };
}

export default MatchesModel;
