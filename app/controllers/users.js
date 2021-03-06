'use strict';

const debug = require('debug')('fishing-logger:users');

const controller = require('lib/wiring/controller');
const models = require('app/models');
const User = models.user;

const crypto = require('crypto');

const authenticate = require('./concerns/authenticate');

const HttpError = require('lib/wiring/http-error');

const getToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, data) =>
      err ? reject(err) : resolve(data.toString('base64'))
    )
  );

const userFilter = { passwordDigest: 0, token: 0 };

const index = (req, res, next) => {
  User.find({}, userFilter)
    .then(users => res.json({ users }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  User.findById(req.params.id, userFilter)
    .then(user => user ? res.json({ user }) : next())
    .catch(err => next(err));
};

const makeErrorHandler = (res, next) =>
  error =>
    error && error.name && error.name === 'ValidationError' ?
      res.status(400).json({ error }) :
    next(error);

const signup = (req, res, next) => {
  let credentials = req.body.credentials;
  let user = { email: credentials.email };
  getToken().then(token =>
    user.token = token
  ).then(() =>
    new User(user).setPassword(credentials.password)
  ).then(newUser => {
    let user = newUser.toObject();
    // delete user.token;
    delete user.passwordDigest;
    res.json({ user });
  }).catch(makeErrorHandler(res, next));
};

const login = (req, res, next) => {
  let credentials = req.body.credentials;
  let search = { email: credentials.email };
  User.findOne(search)
    .then(user =>
      user ? user.comparePassword(credentials.password) :
        Promise.reject(new HttpError(404))
  ).then(user =>
    getToken().then(token => {
      user.token = token;
      return user.save();
    })
  ).then(user => {
    user = user.toObject();
    delete user.passwordDigest;
    res.json({ user });
  }).catch(makeErrorHandler(res, next));
};

const signout = (req, res, next) => {
  getToken().then(token =>
    User.findOneAndUpdate({
      token: req.currentUser.token,
    }, {
      token,
    })
  ).then((user) =>
    user ? res.sendStatus(200) : next()
  ).catch(next);
};

const changepw = (req, res, next) => {
  debug('Changing password');
  User.findOne({
    token: req.currentUser.token,
  }).then(user =>
    user ? user.comparePassword(req.body.passwords.old) :
      Promise.reject(new HttpError(404))
  ).then(user =>
    user.setPassword(req.body.passwords.new)
  ).then((user ) =>
    res.json({ user })
  ).catch(makeErrorHandler(res, next));
};

module.exports = controller({
  index,
  show,
  signup,
  login,
  signout,
  changepw,
}, { before: [
  { method: authenticate, except: ['signup', 'login'] },
], });
