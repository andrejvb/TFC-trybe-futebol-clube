import sequelize = require('sequelize');
import SequelizeTeam from '../database/models/SequelizeTeam';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { ILeaderboardAwayResponse, ILeaderboardHomeResponse } from '../Interfaces/ILeaderboard';

class LeaderBoardService {
  constructor(private model = SequelizeMatch) {
  }

  public boardQueryHome = async () => {
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
    return matches.map((match) => match
      .dataValues) as unknown as ILeaderboardHomeResponse[];
  };

  public boardQueryAway = async () => {
    const matches = await this.model.findAll({
      include: [{ model: SequelizeTeam, association: 'awayTeam', attributes: ['teamName'] }],
      attributes: [
        [sequelize.literal('COUNT(*)'), 'totalGames'],
        [sequelize.literal(`SUM(CASE WHEN home_team_goals < away_team_goals
          THEN 1 ELSE 0 END)`), 'totalVictories'],
        [sequelize.literal(`SUM(CASE WHEN home_team_goals > away_team_goals
          THEN 1 ELSE 0 END)`), 'totalLosses'],
        [sequelize.literal(`SUM(CASE WHEN home_team_goals = away_team_goals
          THEN 1 ELSE 0 END)`), 'totalDraws'],
        [sequelize.literal('SUM(away_team_goals)'), 'goalsFavor'],
        [sequelize.literal('SUM(home_team_goals)'), 'goalsOwn'],
      ],
      where: { inProgress: false },
      group: 'away_team_id',
    });
    return matches.map((match) => match
      .dataValues) as unknown as ILeaderboardAwayResponse[];
  };

  static efficiency(totalGames: number, totalVictories: number, totalDraws: number): number {
    return Number((((
      Number(totalVictories) * 3 + Number(totalDraws)) / (
      Number(totalGames) * 3)) * 100).toFixed(2));
  }

  public leaderBoardHome = async () => {
    const leaderBoard = await this.boardQueryHome();
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

  public finalBalanceHome = async () => {
    const leaderBoardReturn = await this.leaderBoardHome();
    leaderBoardReturn.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
    return leaderBoardReturn;
  };

  public leaderBoardAway = async () => {
    const leaderBoard = await this.boardQueryAway();
    const response = leaderBoard
      .map((match) => ({
        name: match.awayTeam.teamName,
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

  public finalBalanceAway = async () => {
    const leaderBoardReturn = await this.leaderBoardAway();
    return leaderBoardReturn.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;

      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;

      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;

      return b.goalsFavor - a.goalsFavor;
    });
  };
}

export default LeaderBoardService;
