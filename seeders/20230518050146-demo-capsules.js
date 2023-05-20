'use strict';
const axios = require('axios');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await axios.get('https://api.spacexdata.com/v4/capsules')
    .then(async response => {
        console.log(response.data);
        const capsules = response.data.map(capsule => {
            const result = {
                reuse_count: capsule.reuse_count,
                water_landings: capsule.water_landings,
                last_update: capsule.last_update,
                serial: capsule.serial,
                type: capsule.type,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
            return result;
        });
        console.log('CAPSULES', capsules);
        await queryInterface.bulkInsert('capsules', capsules, {});
    })
    .catch((err) => {
        console.log('ERROR', err);
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('capsules', null, {});
  }
};
