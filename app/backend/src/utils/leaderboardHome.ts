import { ProjectionAlias, Sequelize } from 'sequelize';

export const queryHome = {
  string1: `CAST(SUM(CASE WHEN home_team_goals > away_team_goals 
      THEN 3 WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)`,
  string2: 'CAST(SUM(CASE WHEN home_team_goals > away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)',
  string3: 'CAST(SUM(CASE WHEN home_team_goals < away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)',
  string4: 'CAST(SUM(CASE WHEN home_team_goals = away_team_goals THEN 1 ELSE 0 END) AS UNSIGNED)',
  string5: 'CAST(SUM(CASE WHEN home_team_goals > 0 THEN home_team_goals ELSE 0 END) AS UNSIGNED)',
  string6: 'CAST(SUM(CASE WHEN away_team_goals > 0 THEN away_team_goals ELSE 0 END) AS UNSIGNED)',
  string7: 'SUM(home_team_goals - away_team_goals)',
  string8: `
    ROUND((SUM(CASE WHEN home_team_goals > away_team_goals 
      THEN 3 WHEN home_team_goals = away_team_goals 
      THEN 1 ELSE 0 END) / (COUNT(home_team_id) * 3)) * 100, 2)`,
  ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
};
const attributes = [[Sequelize.col('homeTeam.team_name'), 'name'],
  [Sequelize.literal(queryHome.string1), 'totalPoints'],
  [Sequelize.fn('COUNT', Sequelize.col('home_team_id')), 'totalGames'],
  [Sequelize.literal(queryHome.string2), 'totalVictories'],
  [Sequelize.literal(queryHome.string4), 'totalDraws'],
  [Sequelize.literal(queryHome.string3), 'totalLosses'],
  [Sequelize.literal(queryHome.string5), 'goalsFavor'],
  [Sequelize.literal(queryHome.string6), 'goalsOwn'],
  [Sequelize.literal(queryHome.string7), 'goalsBalance'],
  [Sequelize.literal(queryHome.string8), 'efficiency']] as unknown as ProjectionAlias[];

export default attributes;
