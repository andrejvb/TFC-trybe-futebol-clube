import { Model, QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model>('matches', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          homeTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'home_team_id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
            references: {
              model: 'teams',
              key: 'id'
            }
          },
          homeTeamGoals: {
            type: DataTypes.INTEGER,
            field: 'home_team_goals',
            allowNull: false,
          },
          awayTeamId: {
            type: DataTypes.INTEGER,
            field: 'away_team_id',
            allowNull: false,
          },
          awayTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'away_team_goals',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          inProgress: {
            type: DataTypes.BOOLEAN,
            field: 'in_progress',
            allowNull: false,
          },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};