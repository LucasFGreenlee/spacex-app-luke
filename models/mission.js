'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.mission.belongsToMany(models.capsule, {through: 'missionsCapsules'})
    }
  }
  mission.init({
    flight_number: DataTypes.INTEGER,
    name: DataTypes.STRING,
    details: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mission',
  });
  return mission;
};