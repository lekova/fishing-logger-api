'use strict';

const controller = require(require('path').resolve('lib', 'wiring', 'controller'));

/* GET home page. */
const root = (req, res) => {
  res.json({ index: { title: 'Express Template' } });
};

module.exports = controller({
  root,
});
