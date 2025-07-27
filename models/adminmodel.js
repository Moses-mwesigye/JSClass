
const mongoose = require('mongoose');

const AdminRequestSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  chicks: {
    type: Number,
    required: true
  },
  farmer: {
    type: String,
    required: true
  },
  agent: {
    type: String,
    default: ''
  },
  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });



module.exports = mongoose.model('AdminRequest', AdminRequestSchema);
