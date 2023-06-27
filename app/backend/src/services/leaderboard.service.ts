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

  static efficiency(totalGames: number, totalVictories: number, totalDraws: number): number {
    return Number((((
      Number(totalVictories) * 3 + Number(totalDraws)) / (
      Number(totalGames) * 3)) * 100).toFixed(2));
  }

  public leaderBoard = async () => {
    const leaderBoard = await this.boardQuery();
    const response = leaderBoard
      .map((match) => ({
        name: match.homeTeam.teamName,
        totalPoints: Number(match.totalVictories) * 3 + Number(match.totalDraws),
        totalGames: Number(match.totalGames),
        totalVictories: Number(match.totalVictories),
        totalDraws: Number(match.totalDraws),
        totalLosses: Number(match.totalLosses),
        goalsFavor: Number(match.goalsFavor),
        goalsOwn: Number(match.goalsOwn),
        goalsBalance: Number(match.goalsFavor - match.goalsOwn),
        efficiency: LeaderBoardService
          .efficiency(match.totalGames, match.totalVictories, match.totalDraws),
      }));
    return response;
  };

  public finalBalance = async () => {
    const leaderBoardReturn = await this.leaderBoard();
    leaderBoardReturn.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
    console.log(leaderBoardReturn);

    return leaderBoardReturn;
  };
}

export default LeaderBoardService;
