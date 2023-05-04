const { app, PORT } = require('../index');
const request = require('supertest');
const axios = require('axios');

describe('PORT', () => {
    it('PORT is a number', () => {
        expect(typeof PORT).toBe('number');
    });

    it('PORT is 8000 on development', () => {
        expect(PORT).toBe(8000);
    });
});

describe('GET /', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /capsules', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/capsules')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/capsules')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /capsules/*', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/capsules')
            .expect(200, done);
    });
    
    it('should return true', () => {
        axios.get('https://api.spacexdata.com/v3/capsules/serial/C103')
        .then(function(response) {
        let serialValue= response.data.capsule.serial
       // console.log('serialValue', serialValue)
        .expect(Boolean(serialValue)).toBe(true)
        })
        .catch(function(error) {
            console.log(error);
        })
    });
    it('should return false', () => {
        axios.get('https://api.spacexdata.com/v3/capsules/serial/C99')
        .then(function(response) {
        let serialValue= response.data.capsule.serial
        .expect(Boolean(serialValue)).toBe(false)
        })
        .catch(function(error) {
            console.log(error);
        })
    });
    
});

describe('GET /company', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/company')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/company')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /cores', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/cores')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/cores')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should return true', () => {
        axios.get('https://api.spacexdata.com/v4/cores/type/FTB5')
        .then(function(response) {
        let typeValue= response.data.capsule.type
        .expect(Boolean(typeValue)).toBe(true)
        })
        .catch(function(error) {
            console.log(error);
        })
    });

    it('should return true', () => {
        axios.get('https://api.spacexdata.com/v4/cores/reuse_count/5')
        .then(function(response) {
        let reuseValue= response.data.capsule.reuse
        .expect(Boolean(reuseValue)).toBe(true)
        })
        .catch(function(error) {
            console.log(error);
        })
    });
});

describe('GET /crew', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/crew')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/crew')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /dragons', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/dragons')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/dragons')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should return true', () => {
        axios.get('https://api.spacexdata.com/v4/dragons/name/Dragon%201')
        .then(function(response) {
        let nameValue= response.data.capsule.name
        .expect(Boolean(nameValue)).toBe(true)
        })
        .catch(function(error) {
            console.log(error);
        })
    });
});

describe('GET /history', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/history')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/history')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /landpads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/landpads')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/landpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should return true', () => {
        axios.get('https://api.spacexdata.com/v4/landpads/name/LZ-4')
        .then(function(response) {
        let nameValue= response.data.capsule.name
        .expect(Boolean(nameValue)).toBe(true)
        })
        .catch(function(error) {
            console.log(error);
        })
    });
});

describe('GET /launches', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launches')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/launches')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

        it('should return true', () => {
        axios.get('https://api.spacexdata.com/v4/launches/name/Starlink-15')
        .then(function(response) {
        let nameValue= response.data.capsule.name
        .expect(Boolean(nameValue)).toBe(true)
        })
        .catch(function(error) {
            console.log(error);
        })
    });
});

describe('GET /launchpads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/launchpads')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/launchpads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should return true', () => {
        axios.get('https://api.spacexdata.com/v4/launchpads/name/Kwajalein%20Atoll')
        .then(function(response) {
        let nameValue= response.data.capsule.name
        .expect(Boolean(nameValue)).toBe(true)
        })
        .catch(function(error) {
            console.log(error);
        })
    });
});

describe('GET /payloads', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/payloads')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/payloads')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /roadster', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/roadster')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/roadster')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /rockets', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/rockets')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/rockets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /ships', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/ships')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/ships')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /starlink', () => {
    it('respond with 200', (done) => {
        request(app)
            .get('/starlink')
            .expect(200, done);
    });
    
    it('should respond with json', (done) => {
        request(app)
            .get('/starlink')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

