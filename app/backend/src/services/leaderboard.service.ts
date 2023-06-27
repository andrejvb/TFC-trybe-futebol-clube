import sequelize = require('sequelize');
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { ILeaderboardResponse } from '../Interfaces/ILeaderboard';

class LeaderBoardService {
  constructor(private model = SequelizeMatch) {
  }

  public boardQuery = async () => {
    const matches = await this.model.findAll({
      include: [{ model: SequelizeTeam, association: 'homeTeam', attributes: ['teamName'] }],
      attributes: [
        [sequelize.literal('COUNT(*)'), 'totalGames'],
        [sequelize.literal(`SUM(CASE WHEN home_team_goals > away_team_goals
          THEN 1 ELSE 0 END)`), 'totalVictories'],
        [sequelize.literal(`SUM(CASE WHEN home_team_goals < away_team_goals
          THEN 1 ELSE 0 END)`), 'totalLosses'],
        [sequelize.literal(`SUM(CASE WHEN home_team_goals = away_team_goals
          THEN 1 ELSE 0 END)`), 'totalDraws'],
        [sequelize.literal('SUM(home_team_goals)'), 'goalsFavor'],
        [sequelize.literal('SUM(away_team_goals)'), 'goalsOwn'],
      ],
      where: { inProgress: false },
      group: 'home_team_id',
    });
    return matches.map((match) => match.dataValues) as unknown as ILeaderboardResponse[];
  };

  public LeaderBoard = async () => {
    const leaderBoard = await this.boardQuery();
    const response = leaderBoard
      .map((match) => ({
        name: match.homeTeam.teamName,
        totalPoints: Number(match.totalVictories) * 3 + Number(match.totalDraws),
        totalGames: Number(match.totalGames),
        totalVictories: Number(match.totalVictories),
        totalDraws: Number(match.totalDraws),
        totalLosses: Number(match.totalLosses),
        goalsFavor: Number(match.goalsFavor - match.goalsOwn),
        goalsOwn: Number(match.goalsOwn),
      }));
    return response;
  };
}

export default LeaderBoardService;
