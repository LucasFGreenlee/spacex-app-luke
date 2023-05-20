'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payloads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      reused: {
        type: Sequelize.BOOLEAN
      },
      launch: {
        type: Sequelize.STRING
      },
      mass_kg: {
        type: Sequelize.INTEGER
      },
      mass_pounds: {
        type: Sequelize.INTEGER
      },
      orbit: {
        type: Sequelize.STRING
      },
      reference_system: {
        type: Sequelize.STRING
      },
      regime: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      semi_major_axis_km: {
        type: Sequelize.INTEGER
      },
      eccentricity: {
        type: Sequelize.INTEGER
      },
      periapsis_km: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payloads');
  }
};