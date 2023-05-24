const express = require('express');
const router = express.Router();
const axios = require('axios');
const { capsule } = require('../models');

// /capsules route
router.get('/', function (req, res) {
    // axios.get('https://api.spacexdata.com/v4/capsules')
    //     .then(function (response) {
    //         // handle success
    //         return res.render('capsules', { capsules: response.data });
    //     })
    //     .catch(function (error) {
    //         res.json({ message: 'Data not found. Please try again later.' });
    //     });

    // READ all capsules send capsules to 
    capsule.findAll()
    .then(capsules => {
        console.log('raw data capsules', capsules);
        // clean capsules
        const cleaned_capsules = capsules.map(c => c.toJSON());
        console.log('cleaned capsules', cleaned_capsules);
        // return a webpage
        res.render('capsules/index', { capsules: cleaned_capsules });
    })
    .catch(err => {
        console.log('Error', err);
        res.render('no-result');
    })
});

// /capsules/edit/:id -> go to the page that allows to edit
router.get('/edit/:id', function(req, res) {
    // find the capsule, and then go edit page
    capsule.findOne({
        where: { id: parseInt(req.params.id) }
    })
    .then(foundCapsule => {
        // found capsule
        return res.render('capsules/edit', { capsule: foundCapsule });
    })
    .catch(err => {
        console.log('Error', err);
        res.render('no-result');
    })
});

// /capsules/new -> go to page to create a new capsule
router.get('/new', function(req, res) {
    return res.render('capsules/new');
});

// /capsules/search route
router.get('/search', function(req, res) {
    return res.render('capsules/search');
});

// /capsules/:id
router.get('/:id', function (req, res) {
    // axios.get('https://api.spacexdata.com/v4/capsules')
    //     .then(function (response) {
    //         // handle success
    //         let found = false;

    //         for (let i in response.data) {
    //             let capsule = response.data[i];

    //             if (capsule.id === req.params.id) {
    //                 found = true;
    //                 return res.render('single-capsule', { capsule: response.data[i], capsules: response.data });
    //             }
    //         }
    //         if (!found) {
    //             res.json({ data: 'Capsule does not exist.' });
    //         }
    //     })
    //     .catch(function (error) {
    //         res.json({ message: 'Data not found. Please try again later.' });
    //     });
    capsule.findOne({
        where: { id: parseInt(req.params.id) }
    })
    .then(foundCapsule => {
        // found capsule

        // get all other capsules
        capsule.findAll()
        .then(capsules => {
            res.render('capsules/capsule', { capsule: foundCapsule, capsules: capsules })
        })
        .catch(err => {
            console.log('Error', err);
            res.render('no-result');
        })
    })
    .catch(err => {
        console.log('Error', err);
        res.render('no-result');
    })
});

// post route to make new capsule
router.post('/new', function(req, res) {
    const parsed_capsule = {...req.body }
    // change datatype for reuse_count and water_landings
    parsed_capsule.reuse_count = parseInt(req.body.reuse_count);
    parsed_capsule.water_landings = parseInt(req.body.water_landings);
    // create capsule
    capsule.create(parsed_capsule)
    .then(createdCapsule => {
        console.log('capsule created', createdCapsule.toJSON());
        res.redirect('/capsules');
    })
    .catch(err => {
        console.log('Error', err);
        res.render('no-result');
    });
});


router.post('/search', function(req, res) {
    // print req.body to console
    console.log('form data', req.body);
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // handle success
            if (req.body.category === 'serial') {
                for (let i = 0; i < response.data.length; i++) {
                    let capsule = response.data[i];
                    // check to see if capsule serial is equal to req.body.item
                    
                    if (capsule.serial === req.body.item) {
                        // render the capsule item based a made route (id)
                        console.log('-----------')
                        // return res.json({ capsule: capsule });
                        return res.redirect(`/capsules/${capsule.id}`);
                    }
                }
            } else if (req.body.category === 'reuse_count') {
                // filter through the array of capsules
                const reuseCountCapsules = response.data.filter(function (capsule) {
                    // check to see if capsule.reuse_count is equal to req.body.item
                    console.log('----');
                    console.log('capsule', capsule);
                    console.log('reuse count', capsule.reuse_count);
                    console.log('item', parseInt(req.body.item));
                    if (capsule.reuse_count === parseInt(req.body.item)) {
                        return true;
                    } else {
                        return false;
                    }
                });
                // return the json object with all capsules
                // return res.json({ capsules: reuseCountCapsules });
                // we need to render the capsules page with our reuseCountCapsules
                res.render('capsules/index', { capsules: reuseCountCapsules });

            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});


router.put('/edit/:id', function(req, res) {
    // find the capsule, and then go edit page
    console.log('form data', req.body);

    const parsed_capsule = {...req.body }
    // change datatype for reuse_count and water_landings
    parsed_capsule.reuse_count = parseInt(req.body.reuse_count);
    parsed_capsule.water_landings = parseInt(req.body.water_landings);
    console.log('parsed_capsule: ', parsed_capsule);
    
    capsule.update(parsed_capsule, {
        where: { id: parseInt(req.params.id) }
    })
    .then(numOfRowsChanged => {
        console.log('how many rows got updated?', numOfRowsChanged);
        res.redirect(`/capsules/${parseInt(req.params.id)}`);
    })
    .catch(err => console.log('Error', err));
    // capsule.findOne({
    //     where: { id: parseInt(req.params.id) }
    // })
    // .then(foundCapsule => {
    //     // found capsule
    //     return res.render('capsules/edit', { capsule: foundCapsule });
    // })
    // .catch(err => {
    //     console.log('Error', err);
    //     res.render('no-result');
    // })
});

router.delete('/:id', function(req, res) {
    capsule.destroy({ 
        where: { id: parseInt(req.params.id) }
    })
    .then(numOfRowsDeleted => {
        console.log('How many rows were deleted?', numOfRowsDeleted);
        // redirect the user back to all members page /members
        res.redirect('/capsules');
    })
    .catch(err => {
        console.log('Error', err);
        res.render('no-result');
    })
})

module.exports = router;