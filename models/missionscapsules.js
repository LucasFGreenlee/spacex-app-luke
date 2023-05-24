'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class missionsCapsules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  missionsCapsules.init({
    missionId: DataTypes.INTEGER,
    capsuleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'missionsCapsules',
  });
  return missionsCapsules;
};