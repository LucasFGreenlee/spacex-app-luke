const axios = require('axios');

axios.get('https://api.spacexdata.com/v4/capsules')
    .then((response) => {
        console.log(response.data);
        const capsules = response.data.map(capsule => {
            const result = {
                reuse_count: capsule.reuse_count,
                water_landings: capsule.water_landings,
                last_update: capsule.last_update,
                serial: capsule.serial,
                type: capsule.type
            }
            return result;
        });
        console.log('CAPSULES', capsules);
    })
    .catch((err) => {
        console.log('ERROR', err);
    })