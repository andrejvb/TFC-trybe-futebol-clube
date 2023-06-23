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
          },
          homeTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          awayTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          awayTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          inProgress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};