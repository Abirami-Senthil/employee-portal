const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee-portal', (err) => {
  if(!err)
    console.log('MongoDb connection is successful');
  else
    console.log('Error in DB connection : ' +JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;