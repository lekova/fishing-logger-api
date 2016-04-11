'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// users of the app have special requirements
.post('/signup', 'users#signup')
.post('/login', 'users#login')
.delete('/signout/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// custom RESTful routes
.resources('fishing-logs');
