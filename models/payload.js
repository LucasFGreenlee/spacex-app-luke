'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payload.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    reused: DataTypes.BOOLEAN,
    launch: DataTypes.STRING,
    mass_kg: DataTypes.INTEGER,
    mass_pounds: DataTypes.INTEGER,
    orbit: DataTypes.STRING,
    reference_system: DataTypes.STRING,
    regime: DataTypes.STRING,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    semi_major_axis_km: DataTypes.INTEGER,
    eccentricity: DataTypes.INTEGER,
    periapsis_km: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'payload',
  });
  return payload;
};