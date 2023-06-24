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

  findMatchInProgress = async (bool: boolean): Promise<IMatches[]> => this.model.findAll({
    where: {
      inProgress: bool,
    },
    include: [
      {
        model: SequelizeTeam,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: SequelizeTeam,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  });
}

export default MatchesModel;
