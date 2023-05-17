'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ship.init({
    class: DataTypes.STRING,
    year_built: DataTypes.INTEGER,
    home_port: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    class: DataTypes.INTEGER,
    mass_kg: DataTypes.INTEGER,
    mass_lbs: DataTypes.INTEGER,
    link: DataTypes.STRING,
    image: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    legacy_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ship',
  });
  return ship;
};