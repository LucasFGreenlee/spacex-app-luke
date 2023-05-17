const { member, ship } = require('./models');


// create first member
member.create({
    name: 'Luke Bomb',
    status: 'active',
    agency: 'Rosscosmos',
    image: 'https://ca.slack-edge.com/T0351JZQ0-U04N1J9C4TD-15af555d7ea0-512',
    wikipedia: 'https://en.wikipedia.org'
})
    .then((member) => {
        console.log('RAW CREATED MEMBER', member);
        console.log('CREATED MEMBER JSON', member.toJson());
    })


// find member in database
member.findOne({
    where: { name: 'Luke Bomb' }
}).then((foundUser) => {
    console.log('FOUND USER JSON', foundUser.toJson());
})
    .catch((err) => {
        console.log('ERROR', err);
    })

// find or create a member
member.findOrCreate({
    where: { name: 'Rome Bell' },
    defaults: {
        status: 'active',
        agency: 'Rosscosmos',
        image: 'https://ca.slack-edge.com/T0351JZQ0-U0166E8MHJT-a00fa1232131-512',
        wikipedia: 'https://en.wikipedia.org'
    }
})
    .then(([foundOrCreatedMember, created]) => {
        console.log('FOUND OR CREATED MEMBER', foundOrCreatedMember.toJson());
        console.log('CREATED?', created);
    })
    .catch((err) => {
        console.log('ERROR', err);
    })

// find all memebrs
//member.findAll()
//    .then((allMembers) => {
//        console.log('ALL MEMBERS', allMembers);
 //       cleanedMembers = allMembers.map((member) => {
 //           return member.toJson();
//            console.log('CLEANED MEMBERS ARRAY', cleanedMembers);
//        })
//    })
//    .catch((err) => {
//        console.log('ERROR', err);
//    })

// find members based on 'active' status
member.findAll({
    where: { status: 'active' }
})
    .then((activeMembers) => {
        console.log('ACTIVE MEMBERS', activeMembers);
        cleanedActiveMembers = activeMembers.map((member) => {
            return member.toJson();
            console.log('CLEANED ACTIVE MEMBERS ARRAY', cleanedActiveMembers);
        })
            .catch((err) => {
                console.log('ERROR', err);
            })
    })

// update a member
member.update({
    status: 'unknown'
}, {
    where: { status: 'active' }
})
    .then((numRowsChanged) => {
        console.log('NUM ROWS CHANGED', numRowsChanged);
    })
    .catch((err) => {
        console.log('ERROR', err);
    })

// delete a member
member.destroy({
    where: { name: 'John Doe' }
})
    .then((numRowsDeleted) => {
        console.log('NUM ROWS DELETED', numRowsDeleted);
    })
    .catch((err) => {
        console.log('ERROR', err);
    })

//find all ships
ship.findAll()
    .then((allships) => {
        console.log('ALL ships', allships);
        cleanedships = allships.map((ship) => {
            return ship.toJson();
            console.log('CLEANED ships ARRAY', cleanedships);
        })
            .catch((err) => {
                console.log('ERROR', err);
            })
    })

// create or find ships
ship.findOrCreate({
    where: { name: 'GO Pursuit' },
    defaults: {
        class: 7174230,
        year_built: 2007,
        home_port: "Port Canaveral",
        name: "GO Pursuit",
        type: "Cargo",
        class: 7174230,
        mass_kg: 502999,
        mass_lbs: 1108925,
        link: "https://www.marinetraffic.com/en/ais/details/ships/shipid:439594/mmsi:367191410/imo:9458884/vessel:GO_PURSUIT",
        image: "https://i.imgur.com/5w1ZWre.jpg",
        active: false,
        legacy_id: "GOPURSUIT"
    }
})
    .then(([foundOrCreatedship, created]) => {
        console.log('FOUND OR CREATED ship', foundOrCreatedship.toJson());
        console.log('CREATED?', created);
    })
    .catch((err) => {
        console.log('ERROR', err);
    })


//ship.findOne({
//    where: { name: 'GO Pursuit' }
//}).then((foundShip) => {
//    console.log('FOUND SHIP JSON', foundShip.toJson());
//})
//    .catch((err) => {
//        console.log('ERROR', err);
 //   })

ship.findAll({
    where: { status: 'active' }
})
    .then((activeships) => {
        console.log('ACTIVE SHIPS', activeships);
        cleanedActiveships = activeships.map((ship) => {
            return ship.toJson();
            console.log('CLEANED ACTIVE SHIPS ARRAY', cleanedActiveships);
        })
            .catch((err) => {
                console.log('ERROR', err);
            })
    })

ship.findOne({
    where: { legacy_id: 'GOPURSUIT' }
}).then((foundShip) => {
    console.log('FOUND SHIP JSON', foundShip.toJson());
})
    .catch((err) => {
        console.log('ERROR', err);
    })

// update a ship
ship.update({
    status: 'active'
}, {
    where: { status: 'unknown' }
})
    .then((numRowsChanged) => {
        console.log('NUM ROWS CHANGED', numRowsChanged);
    })
    .catch((err) => {
        console.log('ERROR', err);
    })

// delete a ship
ship.destroy({
    where: { name: 'GO Pursuit' }
})
    .then((numRowsDeleted) => {
        console.log('NUM ROWS DELETED', numRowsDeleted);
    })
    .catch((err) => {
        console.log('ERROR', err);
    })