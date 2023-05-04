const express = require('express');
const axios = require('axios');
const { userInfo } = require('os');
const app = express();

app.set('view engine', 'ejs');

app.get('/company', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/company')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /company: ', response.data)
        res.render('company', { company: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/blog-directory', function (req, res) {
    res.sendFile(__dirname + '/views/blog-directory.html');
});

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/capsules', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // handle success
            //console.log(response.data);
            console.log('data for /capsules: ', response.data)
            res.render('capsules', { capsules: response.data })
        })
        .catch(function (error) {
            console.log(error);
            res.json({ message: 'Data not found. Please try again later.' });
        });
});

// Scenario 1 - Return a single capsule
//app.get('/capsules/:serial', function (req, res) {
//    axios.get('https://api.spacexdata.com/v4/capsules')
//        .then(function (response) {
//            // handle success
//            // console.log(response.data);
//            // 
//            for (let i = 0; i < response.data.length; i++) {
//                let capsule = response.data[i];
//                let splitSerial = req.params.serial.split(''); // array ['c', '1', ...]
//                let finalSerial = splitSerial[0].toUpperCase() + splitSerial.slice(1).join('');
//                // upperCaseSerial[0].toUpperCase()
//                // upperCaseSerial.join('');
//                console.log('UpperCase Serial', finalSerial);
//                // console.log('capsule', capsule); // { serial: 'C101', ...}
//                if (capsule.serial === finalSerial) {
//                    return res.json({ capsule: capsule });
//                }
//            }
//           return res.json({ message: 'Capsule does not exist' });
//       })
//       .catch(function (error) {//
//           // console.log(error);
//           return res.json({ message: 'Data not found. Please try again later.' });
//        });
//});

app.get('/capsules/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/capsules')
        .then(function (response) {
            // print req.params
            console.log('req.params', req.params); // print an object
            console.log('api response', response.data); // print an array of capsules
            // run a for loop to search based of the key from req.params
            const capsuleArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let capsule = response.data[i];
                let userRequest = req.params['0'].split('/');
                let countValue = parseInt(userRequest[1]) // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
                if (capsule.serial === userRequest[1].toUpperCase()) {
                    return res.json({ capsule });
                }

            } if (userRequest[0] === 'reuse_count') {
                // check to see which capsule have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (capsule.reuse_count === countValue) {
                    capsuleArray.push(capsule);
                }
                console.log('reuse count', req.params.reuse_count);
            } else if (req.params['0'].includes('status') && capsule.status === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (capsule.status === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (req.params['0'].includes('type') && capsule.type === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (capsule.type === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (req.params['0'].includes('water_landings') && capsule.water_landings === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (capsule.water_landings === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (req.params['0'].includes('last_update') && capsule.last_update === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (capsule.last_update === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (req.params['0'].includes('id') && capsule.id === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (capsule.id === countValue) {
                    capsuleArray.push(capsule);
                }
            } else if (req.params['0'].includes('reuse_count') && capsule.reuse_count === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (capsule.reuse_count === countValue) {
                    capsuleArray.push(capsule);
                }
            } else {
                return res.json({ message: 'Data is not found... Please try again.' });
            }
        })
    if (capsuleArray.length < 1) {
        return res.json({ message: 'Data is not found... Please try again.' });
    } else {
        return res.json({ capsules: capsuleArray });
    }
})

app.get("/search", (req, res) => {
    let result = {};
    // { name: 'capsules', serial: 'C103' }
    // How would we make an axios when the item is different?
    axios.get(`https://api.spacexdata.com/v4/${req.query.item}`)
        .then(function (response) {
            for (let key in req.query) {
                if (key === 'item') {
                    // do nothing
                    continue;
                } else {
                    // run for loop to search for key and value
                    // key -> serial
                    // req.query[key] -> C103
                    for (let i in response.data) {
                        let singItem = response.data[i];
                        if (singItem.serial === req.query[key]) { // if the response singItem.serial is equal the search item C103
                            return res.json({ singItem });
                        } else if (singItem.name === req.query[key]) {
                            return res.json({ singItem });
                        }
                    }
                    return res.json({ message: 'Data not found. Please try again...' })
                }
            }
        })
        .catch(function (error) {
            // console.log(error);
            return res.json({ message: 'Data not found. Please try again later.' });
        });
});


app.get('/cores', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /cores: ', response.data)
        res.render('cores', { cores: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});


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

app.get('/cores/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/cores')
        .then(function (response) {
            // print req.params
            console.log('req.params', req.params); // print an object
            console.log('api response', response.data); // print an array of cores
            // run a for loop to search based of the key from req.params
            const coresArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let core = response.data[i];
                let userRequest = req.params['0'].split('/');
                let countValue = parseInt(userRequest[1]) // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
                if (core.serial === userRequest[1].toUpperCase()) {
                    return res.json({ core });
                }

            } if (userRequest[0] === 'reuse_count') {
                // check to see which core have the reuse count
                // question: is the value of reuse_count a string or number when it comes in
                // from the user...
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                // check the count value
                if (core.reuse_count === countValue) {
                    coresArray.push(core);
                }
                console.log('reuse count', req.params.reuse_count);
            } else if (req.params['0'].includes('status') && core.status === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (core.status === countValue) {
                    coresArray.push(core);
                }
            } else if (req.params['0'].includes('type') && core.type === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (core.type === countValue) {
                    coresArray.push(core);
                }
            } else if (req.params['0'].includes('block') && core.block === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (core.block === countValue) {
                    coresArray.push(core);
                }
            } else if (req.params['0'].includes('last_update') && core.last_update === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (core.last_update === countValue) {
                    coresArray.push(core);
                }
            } else if (req.params['0'].includes('id') && core.id === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (core.id === countValue) {
                    coresArray.push(core);
                }
            } else if (req.params['0'].includes('reuse_count') && core.reuse_count === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (core.reuse_count === countValue) {
                    coresArray.push(core);
                }
            } else {
                return res.json({ message: 'Data is not found... Please try again.' });
            }
        })
    return res.json({ cores: coresArray });
})




app.get('/crew', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/crew')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /crew: ', response.data)
        res.render('crew', { crew: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

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
        //console.log(response.data);
        console.log('data for /dragons: ', response.data)
        res.render('dragons', { dragons: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

//app.get('/dragons', function (req, res) {
 //   axios.get('https://api.spacexdata.com/v4/dragons')
 //       .then(function (response) {
 //           // handle success
 //           res.json({ data: response.data });
//        })
 //       .catch(function (error) {
 //           res.json({ message: 'Data not found. Please try again later.' });
 //       });
//});

app.get('/dragons/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/dragons')
        .then(function (response) {
            // print req.params
            console.log('req.params', req.params); // print an object
            console.log('api response', response.data); // print an array of dragons
            // run a for loop to search based of the key from req.params
            const dragonsArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let capsule = response.data[i];
                let userRequest = req.params['0'].split('/');
                let countValue = parseInt(userRequest[1]) // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
                if (capsule.serial === userRequest[1].toUpperCase()) {
                    return res.json({ capsule });
                }

            } if (req.params['0'].includes('heat_shield') && dragon.heat_shield === userRequest[1]) {
                let countValue = parseInt(userRequest[1]); // Number(userRequest[1])
                if (dragon.heat_shield === countValue) {
                    dragonsArray.push(dragon);
                }
                console.log('heat shield', req.params.heat_shield);
            } else if (req.params['0'].includes('trunk') && dragon.trunk === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (dragon.trunk === countValue) {
                    dragonsArray.push(dragon);
                }
            } else if (req.params['0'].includes('first_flight') && dragon.first_flight === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (dragon.first_flight === countValue) {
                    dragonsArray.push(dragon);
                }
            } else if (req.params['0'].includes('name') && dragon.name === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (dragon.name === countValue) {
                    dragonsArray.push(dragon);
                }
            } else if (req.params['0'].includes('active') && dragon.active === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (dragon.active === countValue) {
                    dragonsArray.push(dragon);
                }
            } else if (req.params['0'].includes('type') && dragon.type === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (dragon.type === countValue) {
                    dragonsArray.push(dragon);
                }
            } else if (req.params['0'].includes('data') && dragon.data === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (dragon.data === countValue) {
                    dragonsArray.push(dragon);
                }
            } else {
                return res.json({ message: 'Data is not found... Please try again.' });
            }
        })
    return res.json({ dragons: dragonsArray });
})

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
        //console.log(response.data);
        console.log('data for /landpads: ', response.data)
        res.render('landpads', { landpads: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/landpads/*/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/landpads')
        .then(function (response) {

            console.log('req.params', req.params); // print an object
            console.log('api response', response.data); // print an array of landpads

            const landpadArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let landpad = response.data[i];
                let userRequest = req.params['0'].split('/');
                let countValue = parseInt(userRequest[1]) // ['serial', 'c103'] ['reuse_count', '0'] parsing -> getting it into the format the will serve us...
                if (landpad.serial === userRequest[1].toUpperCase()) {
                    return res.json({ landpad });
                }
            } if (req.params['0'].includes('launches') && landpad.launches === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (landpad.launches === countValue) {
                    landpadArray.push(landpad);
                }
                console.log('launches', req.params.launches);
            } else if (req.params['0'].includes('status') && landpad.status === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (landpad.status === countValue) {
                    landpadArray.push(landpad);
                }
            } else if (req.params['0'].includes('type') && landpad.type === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (landpad.type === countValue) {
                    landpadArray.push(landpad);
                }
            } else if (req.params['0'].includes('landing_attempts') && landpad.landing_attempts === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (landpad.landing_attempts === countValue) {
                    landpadArray.push(landpad);
                }
            } else if (req.params['0'].includes('id') && landpad.id === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (landpad.id === countValue) {
                    landpadArray.push(landpad);
                }
            } else {
                return res.json({ message: 'Data is not found... Please try again.' });
            }
        })
    return res.json({ landpads: landpadArray });
})


app.get('/launches', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /launches: ', response.data)
        res.render('launches', { launches: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/launches/*/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launches')
        .then(function (response) {

            console.log('req.params', req.params);
            console.log('api response', response.data);
            const launchArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (launch.serial === userRequest[1].toUpperCase()) {
                    return res.json({ launch });
                }

            } if (req.params['0'].includes('success') && success.status === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.success === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('failures') && launch.failures === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.failures === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('net') && launch.net === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.net === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('window') && launch.window === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.window === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('payloads') && launch.payloads === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.payloads === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('name') && launch.name === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.name === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('cores') && launch.cores === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.cores === countValue) {
                    launchArray.push(launch);
                }
            } else {
                return res.json({ message: 'Data is not found... Please try again.' });
            }
        })
    return res.json({ launches: launchArray });
})


app.get('/launchpads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /launchpads: ', response.data)
        res.render('launchpads', { launchpads: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/launchpads/*/*', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/launchpads')
        .then(function (response) {

            console.log('req.params', req.params);
            console.log('api response', response.data);
            const launchArray = [];
            for (let i = 0; i < response.data.length; i++) {
                let launch = response.data[i];
                let userRequest = req.params['0'].split('/');
                if (launch.serial === userRequest[1].toUpperCase()) {
                    return res.json({ launch });
                }

            } if (req.params['0'].includes('name') && name.status === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.name === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('full_name') && launch.full_name === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.full_name === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('latitude') && launch.latitude === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.latitude === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('longitude') && launch.longitude === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.longitude === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('rockets') && launch.rockets === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.rockets === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('id') && launch.id === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.id === countValue) {
                    launchArray.push(launch);
                }
            } else if (req.params['0'].includes('images') && launch.images === userRequest[1]) {
                let countValue = parseInt(userRequest[1]);
                if (launch.images === countValue) {
                    launchArray.push(launch);
                }
            } else {
                return res.json({ message: 'Data is not found... Please try again.' });
            }
        })
    return res.json({ launches: launchArray });
})


app.get('/payloads', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/payloads')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /payloads: ', response.data)
        res.render('payloads', { payloads: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/roadsters', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/roadsters')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /roadsters: ', response.data)
        res.render('roadsters', { roadsters: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/rockets', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/rockets')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /rockets: ', response.data)
        res.render('rockets', { rockets: response.data })
    })
    .catch(function (error) {
        console.log(error);
        res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/ships', function (req, res) {
    axios.get('https://api.spacexdata.com/v4/ships')
    .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log('data for /ships: ', response.data)
        res.render('ships', { ships: response.data })
    })
    .catch(function (error) {
        console.log(error);
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


app.get('/:input', function (req, res) {
    // console.log('req.params', req.params);
    res.json({ message: `There is no data for /${req.params.input}` });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {
    app,
    PORT
};