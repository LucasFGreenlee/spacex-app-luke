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
    missionID: DataTypes.INTEGER,
    capsuleID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'missionsCapsules',
  });
  return missionsCapsules;
};