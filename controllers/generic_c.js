// controller module
// contains functions that a route will call

const Model = require('../models/generic_m');

module.exports.index = (req, res) => {

  const updateView = (result) => {
    res.send(result);
  };

  Model.getAll()
    .then(result => {
      updateView(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err.message);
    });
};
