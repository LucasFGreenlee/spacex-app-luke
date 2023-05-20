const { member, ship, user, order, mission } = require('./models');
const capsule = require('./models/capsule');


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

//make a user
user.create({
    firstName: 'Luke',
    lastName: 'Bomb',
    email: 'lukebomb@email.com'
})
    .then((user) => {
        console.log('RAW CREATED USER', user);
        console.log('CREATED USER JSON', user.toJson());
    }
    )
    .catch((err) => {
        console.log('ERROR', err);
    }
    )

// find a user and create an order
user.findOne({
    where: { email: 'lukebomb@email.com' }
})
    .then((foundUser) => {
        console.log('FOUND USER JSON', foundUser.toJson());
        foundUser.createOrder({
            total: 200000.15,
            items_purchased: 5,
            payment_method: 'American Express'
        })
            .then((order) => {
                console.log('RAW CREATED ORDER', order);
                console.log('CREATED ORDER JSON', order.toJson());
            })
    })

// find user and return all orders
user.findOne({
    where: { email: 'lukebomb@email.com' }
})
    .then((foundUser) => {
        // read all orders for this user
        foundUser.getOrders()
            .then((orders) => {
                console.log('ORDERS', orders);
                const cleanedOrders = orders.map(order => order.toJson()); {
                }
                console.log('CLEANED ORDERS', cleaned_orders);
            })
            .catch((err) => {
                console.log('ERROR', err);
            })
    })
    .catch((err) => {
        console.log('ERROR', err);
    })

order.create({
    items_purchased: 7,
    total: 1000000.99,
    payment_method: 'American Express',
})
    .then((order) => {
        console.log('RAW CREATED ORDER', order);
        console.log('CREATED ORDER JSON', order.toJson());
        user.findOne({
            where: { email: 'lukebomb@email.com' }
        })
            .then((foundUser) => {
                console.log('FOUND USER JSON', foundUser.toJson());
                foundUser.addOrder(order)
                    .then((orders) => {
                        console.log('RELATION INFO', orders);
                    })
            })
            .catch((err) => {
                console.log('ERROR', err);
            })
    })
    .catch((err) => {
        console.log('ERROR', err);
    })

//add a mission to a capsule
mission.create({
    flight_number: 34934893,
    name: 'Steal the Moon',
    details: 'Robbing the moon of its cheese'
})
    .then((mission) => {
        console.log('RAW CREATED MISSION', mission);
        console.log('CREATED MISSION JSON', mission.toJson());
        capsule.findOne({
            where: { id: 1 }
        })
            .then((foundCapsule) => {
                console.log('FOUND CAPSULE JSON', foundCapsule.toJson());
                mission.addCapsule(capsule)
                    .then(updatedMission => {
                        console.log('result', updatedMission)
                        // get capsules that belong to mission
                        updatedMission.getCapsule()
                            .then(capsules => {
                                console.log('CAPSULES', capsules);
                            })
                            .catch((err) => {
                                console.log('ERROR', err);
                            })
                            .catch((err) => {
                                console.log('ERROR', err);
                            })
                            .catch((err) => {
                                console.log('ERROR', err);
                            })
                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                    })
            })
    })
    .catch((err) => {
        console.log('ERROR', err);
    }
    )


    //find capsule and create a mission, then add mission to capsule (hint: addMission)
capsule.findOne({
    where: { id: 2 }
})
    .then((foundCapsule) => {
        console.log('FOUND CAPSULE JSON', foundCapsule.toJson());
        mission.create({
            flight_number: 309454,
            name: 'Make it back...',
            details: 'Return with all the moon cheese'
        })
            .then((mission) => {
                console.log('RAW CREATED MISSION', mission);
                console.log('CREATED MISSION JSON', mission.toJson());
                foundCapsule.addMission(mission)
                    .then(updatedCapsule => {
                        console.log('result', updatedCapsule)
                        // get missions that belong to capsule
                        updatedCapsule.getMission()
                            .then(missions => {
                                console.log('MISSIONS', missions);
                            })
                            .catch((err) => {
                                console.log('ERROR', err);
                            })
                    })
                    .catch((err) => {
                        console.log('ERROR', err);
                    })
            })
            .catch((err) => {
                console.log('ERROR', err);
            }
            )
    })

    mission.findOne({
        where: { id: 1 }
        include: [capsule]
    })
        .then((foundMission) => {
            console.log('FOUND MISSION JSON', foundMission.toJson());
            console.log('FOUND MISSION JSON', foundMission.capsule.toJson());
        })
        .catch((err) => {
            console.log('ERROR', err);
        })