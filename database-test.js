const { member, capsule, user, order, mission } = require('./models');

// create our first member
// member.create({
//     name: 'John Smith',
//     status: 'active',
//     agency: 'Roscosmos',
//     image: 'https://ca.slack-edge.com/T0351JZQ0-U0166E8MHJT-a00fa1232131-512',
//     wikipedia: 'https://wikipedia.com'
// })
// .then(createdMember => {
//     console.log('RAW CREATED MEMBER', createdMember);
//     console.log('CLEANED MEMBER', createdMember.toJSON());
// })

// read a member in database
// member.findOne({
//     where: { name: 'Rome Bell' }
// })
// .then(foundMember => {
//     console.log('found member', foundMember.toJSON());
// })
// .catch(err => console.log('Error', err));

// find or create a member
// member.findOrCreate({
//     where: { name: 'Ethan Paiva' },
//     defaults: { 
//         status: 'active', 
//         agency: 'Roscosmos', 
//         image: 'https://ca.slack-edge.com/T0351JZQ0-U04MV3X1K46-e0b0baa58e91-512',
//         wikipedia: 'https://wikipedia.com'
//     }
// })
// .then(([member, created]) => {
//     console.log('created or not:', created);
//     console.log('member', member.toJSON());
// })
// .catch(err => console.log('Error', err));

// find all members
// member.findAll()
// .then(members => {
//     // console.log('All members', members);
//     // clean the data
//     cleanedMembers = members.map(member => member.toJSON());
//     console.log('CLEANED MEMBERS ARRAY', cleanedMembers);
// })
// .catch(err => console.log('Error', err));

// find member based off active status
// member.findAll({
//     where: { status: 'active' }
// })
// .then(members => {
//     // console.log('All members', members);
//     // clean the data
//     cleanedMembers = members.map(member => member.toJSON());
//     console.log('CLEANED MEMBERS ARRAY', cleanedMembers);
// })
// .catch(err => console.log('Error', err));

// update a member
// member.update({ status: 'active' }, {
//     where: { status: 'unknown', id: 1 }
// })
// .then(numOfRowsChanged => {
//     console.log('how many rows got updated?', numOfRowsChanged);
// })
// .catch(err => console.log('Error', err));

// delete member

// this will go to the members table inside of the spacex database, 
// search the table for name (column) John Smith (all)
// then deletes that row from the table 
// in the .then there is a callback, which takes in the result and runs a function
// to execute whatever we want [ redirect to another site, json response via an API, or console.logging ]
// .catch [error: the table doesn't exist, the column doesn't exist, syntaxError, referenceError]

// member.destroy({ 
//     where: { name: 'John Smith'}
// })
// .then(numOfRowsDeleted => {
//     console.log('How many rows were deleted?', numOfRowsDeleted);
//     // redirect the user back to all members page /members

// })
// .catch(err => console.log('Error', err));
// render an 404 page, or some page that says "member is not found, please try again"


// find all capsules
// capsule.findAll()
// .then(capsules => {
//     // console.log('All members', members);
//     // clean the data
//     cleanedCapsules = capsules.map(capsule => capsule.toJSON());
//     console.log('CLEANED CAPSULES ARRAY', cleanedCapsules);
// })
// .catch(err => console.log('Error', err));


// create a user
// user.create({
//     firstName: 'Ron',
//     lastName: 'Jones',
//     email: 'ronjones@email.com'
// })
// .then(newUser => {
//     console.log('new user', newUser.toJSON());
// })
// .catch(err => console.log('Error', err));

// find a user and create an order
// user.findOne({
//     where: { email: "ronjones@email.com" }
// })
// .then(user => {
//     console.log('found user', user.toJSON());
//     // create an order
//     user.createOrder({
//         items_purchased: 4,
//         payment_method: 'American Express',
//         total: 700000.15
//     })
//     .then(newOrder => {
//         console.log('new order created', newOrder.toJSON());
//     })
//     .catch(err => console.log('Error', err));
// })
// .catch(err => console.log('Error', err));

// find a user and get back all orders
// user.findOne({
//     where: { email: "ronjones@email.com" }
// })
// .then(user => {
//     // read all orders
//     user.getOrders()
//     .then(orders => {
//         console.log('all orders', orders);
//         const cleaned_orders = orders.map(o => o.toJSON());
//         console.log('clean orders', cleaned_orders);
//     }) // what is orders (datatype)?
//     .catch(err => console.log('Error', err));
// })
// .catch(err => console.log('Error', err));

// create the order, then find the user, lastly add order to user
// order.create({
//     items_purchased: 7,
//     total: 1000000.99,
//     payment_method: 'American Express'
// })
// .then(order => {
//     console.log('new order', order.toJSON());
//     // find the user
//     user.findOne({
//         where: { email: "ronjones@email.com" }
//     })
//     .then(user => {
//         console.log('found the user', user.toJSON());
//         // add order to user
//         user.addOrder(order)
//         .then(addOrder => {
//             console.log('result', addOrder);
//             // find all orders
//             user.getOrders()
//             .then(orders => {
//                 console.log('all orders', orders);
//             })
//             .catch(err => console.log('Error', err));
//         })
//         .catch(err => console.log('Error', err));
//     })
//     .catch(err => console.log('Error', err));
// })
// .catch(err => console.log('Error', err));


// Add a mission
// mission.create({
//     flight_number: 34934893,
//     name: "Steal The Moon",
//     details: "Plan to take the minerals from the moon and send them back to Earth"
// })
// .then(mission => {
//     console.log('new mission', mission.toJSON());

//     // find capsule
//     capsule.findOne({
//         where: { id: 1 } 
//     })
//     .then(capsule => {
//         console.log('found capsule', capsule.toJSON());
//         // add capsule to mission
//         mission.addCapsule(capsule)
//         .then(result => {
//             console.log('-------> RESULT', result); // array that has the association between capsule and mission
//         })
//         .catch(err => console.log('Error', err));
//     })
//     .catch(err => console.log('Error', err));
// })
// .catch(err => console.log('Error', err));

// TODO: find a capsule (id=2), create a mission, and then add mission to capsule (hint: addMission)
// capsule.findOne({
//     where: { id: 2}
// })
// .then(foundCapsule => {
//     console.log('found capsule', foundCapsule.toJSON());
//     // create a mission
//     mission.create({
//         flight_number: 309454,
//         name: 'Make it back...',
//         details: 'Take us home'
//     })
//     .then(createdMission => {
//         console.log('created mission', createdMission.toJSON());
//         // add mission to capsule
//         foundCapsule.addMission(createdMission)
//         .then(result => {
//             console.log('result...', result);
//         })
//         .catch(err => console.log('Error', err));
//     })
//     .catch(err => console.log('Error', err));
// })
// .catch(err => console.log('Error', err));

// find a mission, getCapsules() ***

// find a capsule, getMissions() ***

// *** we can do these

// find a mission and include all of the capsules
mission.findOne({
    where: { id: 1 },
    include: [capsule]
})
.then(foundMission => {
    console.log('1. mission with capsules included', foundMission.toJSON());
})
.catch(err => console.log('Error', err));

// find a capsule and include all of the missions
capsule.findOne({
    where: { id: 2 },
    include: [mission]
})
.then(foundCapsule => {
    console.log('2. capsule with missions included', foundCapsule.toJSON());
})
.catch(err => console.log('Error', err));