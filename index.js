const express = require('express');
const axios = require('axios');
const app = express();
const ejsLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
    .then(function (response) {
        // handle success
        return res.render('index', { company: response.data });
    })
    .catch(function (error) {
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname+'/views/about.html');
});

app.get('/blog', function (req, res) {
    res.sendFile(__dirname+'/views/blog-directory.html');
});

app.get('/changelog', function (req, res) {
    return res.render('changelog');
});

app.get('/contact', function (req, res) {
    return res.render('contact');
});

app.get('/list', function (req, res) {
    return res.render('list');
});

app.get('/index', function (req, res) {
    return res.render('index');
});

app.get('/search', function (req, res) {
    return res.render('search');
});

app.get('/single', function (req, res) {
    return res.render('single');
});

app.get('/capsules', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // handle success
            return res.render('capsules', { capsules: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/capsules/new', function(req, res) {
    return res.render('capsules/new')
});

// Return a single capsule
app.get('/capsules/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let capsule = response.data[i];

                if (capsule.id === req.params.id) {
                    found = true;
                    return res.render('single-capsule', { capsule: response.data[i], capsules: response.data });
                }
            }
            if (!found) {
                res.json({ data: 'Capsule does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.post('/capsules', function(req, res) {
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
                res.render('capsules', { capsules: reuseCountCapsules });

            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// // Return Capsules by Parameter
// app.get('/capsules/*', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/capsules')
//         .then(function (response) {
//             // print req.params, API response
//             // console.log('req.params', req.params); // print an object
//             // console.log('response', response.data); // print an array of capsules

//             // run a for loop to search based on the key from req.params
//             const capsuleArray = [];
//             for (let i in response.data) {
//                 let capsule = response.data[i];
//                 let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
//                 if(userRequest[0].toLowerCase() === 'serial') { // search by serial
//                     if(capsule.serial.toUpperCase() === userRequest[1].toUpperCase()) {
//                         return res.json({ capsule });
//                     }
//                 } else if(userRequest[0].toLowerCase() === 'serial') { // search by id
//                     if(capsule.id.toUpperCase() === userRequest[1].toUpperCase()) {
//                         return res.json({ capsule });
//                     }
//                 } else if (userRequest[0].toLowerCase() === 'reuse_count') { // search by reuse_count
//                     let countValue = parseInt(userRequest[1]);
//                     if (capsule.reuse_count === countValue) {
//                         capsuleArray.push(capsule);
//                     }
//                 } else if (userRequest[0].toLowerCase() === 'water_landings') { // search by water_landings
//                     let countValue = parseInt(userRequest[1]);
//                     if (capsule.water_landings === countValue) {
//                         capsuleArray.push(capsule);
//                     }
//                 } else if (userRequest[0].toLowerCase() === 'last_update') { // search by last_update
//                     if (capsule.last_update === userRequest[1]) {
//                         capsuleArray.push(capsule);
//                     }
//                 } else if (userRequest[0].toLowerCase() === 'status') { // search by status
//                     if (capsule.status === userRequest[1]) {
//                         capsuleArray.push(capsule);
//                     }
//                 } else if (userRequest[0].toLowerCase() === 'type') { // search by type
//                     if (capsule.type === userRequest[1]) {
//                         capsuleArray.push(capsule);
//                     }
//                 } else {
//                     return res.json({ message: 'Invalid key.' });
//                 }
//             }
            
//             if (capsuleArray.length > 0) {
//                 return res.json({ capsules: capsuleArray });
//             } else {
//                 return res.json({ message: 'No matching capsules.' });
//             }
//         });
// });

app.get('/company', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/cores', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single core by Serial
// app.get('/cores/:serial', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/cores')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let core = response.data[i];

//                 if (core.serial === req.params.serial.toUpperCase()) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Core does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return cores by Parameter
app.get('/cores/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // print req.params, API response
            // console.log('req.params', req.params); // print an object
            // console.log('response', response.data); // print an array of cores

            // run a for loop to search based on the key from req.params
            const coreArray = [];
            for (let i in response.data) {
                let core = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
                if(userRequest[0].toLowerCase() === 'serial') { // search by serial
                    if(core.serial.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ core });
                    }
                } else if(userRequest[0].toLowerCase() === 'last_update') { // search by last_update
                    if(core.last_update === userRequest[1]) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0].toLowerCase() === 'reuse_count') { // search by reuse_count
                    let countValue = parseInt(userRequest[1]);
                    if (core.reuse_count === countValue) {
                        coreArray.push(core);
                    }
                } else if (userRequest[0].toLowerCase() === 'rtls_landings') { // search by rtls_landings
                    let countValue = parseInt(userRequest[1]);
                    if (core.rtls_landings === countValue) {
                        coreArray.push(core);
                    }
                } else if(userRequest[0].toLowerCase() === 'status') { // search by status
                    if(core.status === userRequest[1]) {
                        coreArray.push(core);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (coreArray.length > 0) {
                return res.json({ cores: coreArray });
            } else {
                return res.json({ message: 'No matching cores.' });
            }
        });
});

app.get('/crew', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a crew member by Name
app.get('/crew/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let crewmem = response.data[i];
                // console.log(crewmem.name, req.params.name);

                if (crewmem.name === req.params.name) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Crew member does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/dragons', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single dragon by ID
// app.get('/dragons/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/dragons')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let dragon = response.data[i];

//                 if (dragon.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Dragon does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return dragons by Parameter
app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // print req.params, API response
            // console.log('req.params', req.params); // print an object
            // console.log('response', response.data); // print an array of dragons

            // run a for loop to search based on the key from req.params
            const dragonArray = [];
            for (let i in response.data) {
                let dragon = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
                if(userRequest[0].toLowerCase() === 'name') { // search by name
                    if(dragon.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ dragon });
                    }
                } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                    if(dragon.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ dragon });
                    }
                } else if (userRequest[0].toLowerCase() === 'crew_capacity') { // search by crew_capacity
                    let crewCap = parseInt(userRequest[1]);
                    if (dragon.crew_capacity === crewCap) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0].toLowerCase() === 'status') { // search by status
                    if (dragon.status === userRequest[1]) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0].toLowerCase() === 'type') { // search by type
                    if (dragon.type === userRequest[1]) {
                        dragonArray.push(dragon);
                    }
                } else if (userRequest[0].toLowerCase() === 'active') { // search by active
                    if ((dragon.active === true && userRequest[1].toLowerCase() === 'true') || (dragon.active === false && userRequest[1].toLowerCase() === 'false')) {
                        dragonArray.push(dragon);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (dragonArray.length > 0) {
                return res.json({ dragons: dragonArray });
            } else {
                return res.json({ message: 'No matching dragons.' });
            }
        });
});

app.get('/history', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/history')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/landpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single landpad by ID
// app.get('/landpads/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/landpads')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let landpad = response.data[i];

//                 if (landpad.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Landpad does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return landpads by Parameter
app.get('/landpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {
            // print req.params, API response
            // console.log('req.params', req.params); // print an object
            // console.log('response', response.data); // print an array of landpads

            // run a for loop to search based on the key from req.params
            const landpadArray = [];
            for (let i in response.data) {
                let landpad = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
                if(userRequest[0].toLowerCase() === 'full_name') { // search by full_name
                    if(landpad.full_name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ landpad });
                    }
                } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                    if(landpad.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ landpad });
                    }
                } else if(userRequest[0].toLowerCase() === 'region') { // search by region
                    if(landpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ landpad });
                    }
                }else if (userRequest[0].toLowerCase() === 'landing_attempts') { // search by landing_attempts
                    let landAttempts = parseInt(userRequest[1]);
                    if (landpad.landing_attempts === landAttempts) {
                        landpadArray.push(landpad);
                    }
                } else if (userRequest[0].toLowerCase() === 'type') { // search by type
                    if (landpad.type === userRequest[1]) {
                        landpadArray.push(landpad);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (landpadArray.length > 0) {
                return res.json({ landpads: landpadArray });
            } else {
                return res.json({ message: 'No matching landpads.' });
            }
        });
});

app.get('/launches', function (req, res) {
    axios.get('https://api.spacexdata.com/v5/launches')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});


// Return a single launch by ID
// app.get('/launches/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v5/launches')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let launch = response.data[i];

//                 if (launch.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Launch does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return launches by Parameter
app.get('/launches/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {
            // print req.params, API response
            // console.log('req.params', req.params); // print an object
            // console.log('response', response.data); // print an array of launches

            // run a for loop to search based on the key from req.params
            const launchArray = [];
            for (let i in response.data) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
                if(userRequest[0].toLowerCase() === 'name') { // search by name
                    if(launch.name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launch });
                    }
                } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                    if(launch.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launch });
                    }
                } else if(userRequest[0].toLowerCase() === 'region') { // search by region
                    if(launch.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launch });
                    }
                } else if (userRequest[0].toLowerCase() === 'flight_number') { // search by flight_number
                    let flightNumber = parseInt(userRequest[1]);
                    if (launch.flight_number === flightNumber) {
                        launchArray.push(launch);
                    }
                } else if (userRequest[0].toLowerCase() === 'success') { // search by success
                    if ((launch.success === true && userRequest[1].toLowerCase() === 'true') || (launch.success === false && userRequest[1].toLowerCase() === 'false')) {
                        launchArray.push(launch);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (launchArray.length > 0) {
                return res.json({ launches: launchArray });
            } else {
                return res.json({ message: 'No matching launches.' });
            }
        });
});

app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // handle success
            res.render('launchpads', { launchpads: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/launchpads/search', function(req, res) {
    return res.render('launchpads/search');
});

// --------------------- search ------------------------------------
app.post('/launchpads/search', function(req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
    .then(function(response) {
        console.log(response.data.timezone) // what is response.data? array of launchpads
        // console.log('anybody home?', req.params);
        // what are we trying to do here? [isolate timezones] [figure out category that user selected] 
        console.log('anybody home?', req.body); // { category: 'timezone', item: 'America' }

        // what's next
        if (req.body.category === 'timezone') {
            let result = [];
            for (let i = 0; i < response.data.length; i++) {
                const launchpad = response.data[i];
                // what's next?
                // remove _ and add a space
                console.log('remove _ and add space: ', launchpad.timezone.split('_').join(' ').toLowerCase()); // aka beastmode
                if (launchpad.timezone.split('_').join(' ').toLowerCase().includes(req.body.item.toLowerCase())) {
                    // what's next?
                    result.push(launchpad);
                }
            }
            if (!result.length) {
                // render a page that has no results were found...
                return res.render('no-result', { item: req.body.item, search: 'Launchpads' });
            }
            // what's next?
            return res.render('launchpads', { launchpads: result });
        }
    })
    .catch(function (error) {
        // render a page that has no results found.
        return res.render('no-result', { item: req.body.item, search: 'Launchpads' });
        // res.json({ message: 'Data not found. Please try again later.' });
    });
});
// --------------------- search ------------------------------------



// Return a single launchpad by ID
// app.get('/launchpads/:id', function (req, res) {
//     axios.get('https://api.spacexdata.com/v4/launchpads')
//         .then(function (response) {
//             // handle success
//             let found = false;

//             for (let i in response.data) {
//                 let launchpad = response.data[i];

//                 if (launchpad.id === req.params.id) {
//                     res.json({ data: response.data[i] });
//                     found = true;
//                 }
//             }
//             if (!found) {
//                 res.json({ data: 'Launchpad does not exist.' });
//             }
//         })
//         .catch(function (error) {
//             res.json({ message: 'Data not found. Please try again later.' });
//         });
// });

// Return launchpads by Parameter
app.get('/launchpads/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {
            // print req.params, API response
            // console.log('req.params', req.params); // print an object
            // console.log('response', response.data); // print an array of launchpads

            // run a for loop to search based on the key from req.params
            const launchpadArray = [];
            for (let i in response.data) {
                let launchpad = response.data[i];
                let userRequest = req.params['0'].split('/'); // ['serial', 'c103'] ['reuse_count', '0']
                
                if(userRequest[0].toLowerCase() === 'full_name') { // search by full_name
                    if(launchpad.full_name.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad });
                    }
                } else if(userRequest[0].toLowerCase() === 'id') { // search by id
                    if(launchpad.id.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad });
                    }
                } else if(userRequest[0].toLowerCase() === 'region') { // search by region
                    if(launchpad.region.toUpperCase() === userRequest[1].toUpperCase()) {
                        return res.json({ launchpad });
                    }
                }else if (userRequest[0].toLowerCase() === 'launch_attempts') { // search by launch_attempts
                    let launchAttempts = parseInt(userRequest[1]);
                    if (launchpad.launch_attempts === launchAttempts) {
                        launchpadArray.push(launchpad);
                    }
                } else if (userRequest[0].toLowerCase() === 'status') { // search by status
                    if (launchpad.status.toUpperCase() === userRequest[1].toUpperCase()) {
                        launchpadArray.push(launchpad);
                    }
                } else {
                    return res.json({ message: 'Invalid key.' });
                }
            }
            
            if (launchpadArray.length > 0) {
                return res.json({ launchpads: launchpadArray });
            } else {
                return res.json({ message: 'No matching launchpads.' });
            }
        });
});

app.get('/payloads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single payload by ID
app.get('/payloads/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let payload = response.data[i];

                if (payload.id === req.params.id) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Payload does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/roadster', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/roadster')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/rockets', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a rocket by Name
app.get('/rockets/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let rocket = response.data[i];

                if (rocket.name === req.params.name) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Rocket does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/ships', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a ship by Name
app.get('/ships/:name', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let ship = response.data[i];

                if (ship.name === req.params.name) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Ship does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/starlink', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            res.json({ data: response.data });
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Return a single payload by ID
app.get('/starlink/:id', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/starlink')
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let satellite = response.data[i];

                if (satellite.id === req.params.id) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ data: 'Satellite does not exist.' });
            }
        })
        .catch(function (error) {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/search', (req, res) => {
    // parse query string
    let item, searchBy, searchVal;
    
    for (let key in req.query) {
        switch (key) {
            case 'item':
                item = req.query[key];
                break;
            default:
                searchBy = key;
                searchVal = req.query[key];
                break;
        }
    }

    axios.get(`https://api.spacexdata.com/v4/${item}`)
        .then(function (response) {
            // handle success
            let found = false;

            for (let i in response.data) {
                let loopItem = response.data[i];

                if (loopItem[searchBy] === searchVal) {
                    res.json({ data: response.data[i] });
                    found = true;
                }
            }
            if (!found) {
                res.json({ message: `No matching item found.` });
            }
        })
        .catch((error) => {
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

app.get('/:input', function (req, res) {
    // console.log('req.params', req.params);
    res.json({ message: `There is no data for /${req.params.input}` });
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, function () {
    console.log(`Server is running on PORT`, PORT);
});

app.use('/capsules', require('./controllers/capsules'));

module.exports = {
    server,
    app,
    PORT,
    axios
};