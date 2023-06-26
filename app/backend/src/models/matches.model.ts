import IMatches from '../Interfaces/IMatches';
import SequelizeMatch from '../database/models/SequelizeMatch';
import IMatchModel from '../Interfaces/IMatchesModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

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

  findMatchInProgress = async (inProgress?: boolean): Promise<IMatches[]> => {
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
}

export default MatchesModel;
