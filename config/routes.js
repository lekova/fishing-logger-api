'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// users of the app have special requirements
.post('/signup', 'users#signup')
.post('/login', 'users#login')
.delete('/signout', 'users#signout')
.patch('/changepw', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// custom RESTful routes
.resources('fishing-logs')
.post('/weather', 'weather#create')
.get('/weather', 'weather#index');
