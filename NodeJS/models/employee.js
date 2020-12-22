const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
  name: {type: String},
  position: {type: String},
  roles: {type: Array},
  activate: {type: Boolean}
});

module.exports = { Employee };