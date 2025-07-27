const mongoose = require('mongoose')
const blaaa = require('../sroutes/signup2')


const userss = new mongoose.Schema({
    role: {
    type: String,
    enum: ['manager', 'salesrep', 'customer'],
    required: true
  },
  username: { // passport-local-mongoose expects 'username'
    type: String,
    required: true
  },
  Age: {
    type: String,
    required: true
  }
})




module.exports = mongoose.model('signup2',userss )