'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const FishingLog = models.fishingLog;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  let search = { _owner: req.currentUser._id };
  FishingLog.find(search)
    .then(fishingLogs => {
        if (fishingLogs.length == 0) {
            return res.json('No logs yet!');
        }
        return res.json({ fishingLogs })
    })
    .catch(err => next(err));
};

const show = (req, res, next) => {
  FishingLog.findById(req.params.id)
    .then(fishingLog => {
        if (fishingLog.length == 0) {
            return res.json('No logs yet!');
        }
        return fishingLog ? res.json({ fishingLog }) : next()
    })
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let fishingLog = Object.assign(req.body.fishingLog, {
    _owner: req.currentUser._id,
  });
  FishingLog.create(fishingLog)
    .then(fishingLog => res.json({ fishingLog }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  FishingLog.findOne(search)
    .then(fishingLog => {
      if (!fishingLog) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return fishingLog.update(req.body.fishingLog)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  FishingLog.findOne(search)
    .then(fishingLog => {
      if (!fishingLog) {
        return next();
      }

      return fishingLog.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate },
], });
